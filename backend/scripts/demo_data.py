import math

import numpy as np



def demo_rows():
    rng = np.random.default_rng(1005)
    rows = []
    centers = [(8, 18, 1600), (28, 7, 620), (72, 2, 180)]
    for index in range(3000):
        center = centers[index % 3]
        rows.append({"member_id": f"VIP{index:05d}",
                     "recency": max(1, round(rng.normal(center[0], center[0] * .16))),
                     "frequency": max(1, round(rng.normal(center[1], center[1] * .2))),
                     "monetary": max(20, round(rng.normal(center[2], center[2] * .18), 2)),
                     "store": f"S{index % 86:03d}"})
    return rows

