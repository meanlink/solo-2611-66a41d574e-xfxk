import itertools
import math
from datetime import datetime, timedelta, timezone

import numpy as np
from scipy import stats
from sklearn.cluster import DBSCAN, KMeans
from sklearn.ensemble import IsolationForest
from sklearn.feature_selection import mutual_info_classif
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, roc_auc_score, roc_curve, silhouette_score
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import TfidfVectorizer


def _metric(label, value, unit="", tone="neutral"):
    if isinstance(value, (np.floating, np.integer)):
        value = value.item()
    return {"label": label, "value": value, "unit": unit, "tone": tone}


def _series(label, value):
    return {"label": str(label), "value": float(value)}


def _envelope(headline, narrative, metrics, series, table, method, caveat):
    return {
        "headline": headline,
        "narrative": narrative,
        "metrics": metrics,
        "series": series,
        "table": table,
        "method": method,
        "caveat": caveat,
    }


def run_primary(rows: list[dict], config: dict) -> dict:
    matrix = np.asarray([
        [float(row.get("recency", 0)), float(row.get("frequency", 0)), float(row.get("monetary", 0))]
        for row in rows
    ], dtype=float)
    if len(matrix) < 12:
        raise ValueError("会员样本不足")
    scaled = StandardScaler().fit_transform(matrix)
    k_value = int(config.get("clusters", 3))
    model = KMeans(n_clusters=k_value, random_state=42, n_init=10).fit(scaled)
    score = silhouette_score(scaled, model.labels_) if len(set(model.labels_)) > 1 else 0.0
    profiles = []
    for cluster in sorted(set(model.labels_)):
        subset = matrix[model.labels_ == cluster]
        profiles.append({
            "label": f"客群 {cluster + 1}",
            "size": int(len(subset)),
            "recency": round(float(subset[:, 0].mean()), 2),
            "frequency": round(float(subset[:, 1].mean()), 2),
            "monetary": round(float(subset[:, 2].mean()), 2),
        })
    profiles.sort(key=lambda item: item["monetary"], reverse=True)
    largest = max(profiles, key=lambda item: item["size"])
    return _envelope(
        f"形成 {k_value} 个客群，最大群 {largest['label']} 占 {largest['size'] / len(matrix):.1%}",
        f"K-means++ 轮廓系数 {score:.3f}；画像用于运营动作，不应替代人工抽检。",
        [
            _metric("轮廓系数", score, "", "positive" if score > .35 else "neutral"),
            _metric("客群数", k_value, "群", "neutral"),
            _metric("样本量", len(matrix), "人", "neutral"),
            _metric("最大群占比", largest["size"] / len(matrix) * 100, "%", "neutral"),
        ],
        [_series(item["label"], item["size"]) for item in profiles],
        profiles,
        "kmeans_plus_plus + silhouette",
        "簇编号没有天然业务顺序；上线前需用稳定性和运营可执行性复核。",
    )



def run_algorithm(rows: list[dict], config: dict) -> dict:
    return run_primary(rows or [], config or {})
