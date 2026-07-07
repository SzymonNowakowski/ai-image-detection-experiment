# ai-image-detection-experiment

Experiment for image classification (AI/real) by people

## Directory structure

```
ai-image-detection-experiment/
│
├── README.md
├── requirements.txt
├── .gitignore
│
├── generate_manifest.py
│
├── experiment/
│   ├── index.html
│   ├── experiment.js
│   ├── manifest.json
│   │
│   └── images/
│       ├── ai/
│       └── real/
│
└── analysis/
    └── analyze_results.py
```

## `manifest.json` file structure

```
[
  {
    "file": "images/ai/ai001.png",
    "label": "AI"
  },
  {
    "file": "images/real/real001.png",
    "label": "REAL"
  }
]
```


## Experiment setupe and execution:

```
python generate_manifest.py

python -m http.server 8000
```

And in the browser:
```
http://localhost:8000
```




