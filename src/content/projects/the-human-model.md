---
title: "The Human Model"
slug: "the-human-model"
summary: "A longitudinal model of me that predicts my next training session every night and scores itself against what I lifted. A Kalman strength estimate, a baseline every model must beat and an ensemble; the engine is public and runs on a synthetic athlete."
longDescription: 'Observations keep their provenance, what I say shapes recommendations but changes expectations only after a held-out check, and every prediction and outcome is stored append-only. On my real log it beats "same as last time" (2.4 kg against 2.6 kg mean error); no readiness score predicted how I lift.'
coreQuestion: "How do you represent a person in software when the person keeps changing?"
status: "Active · Running nightly; engine public"
featured: true
accent: "rust"
tags:
  - "Personal data"
  - "Adaptive modeling"
  - "Biomechanics"
  - "AI-assisted reasoning"
topics:
  - "Human Model"
  - "Human Performance"
  - "Human-Centered Technology"
repositoryUrl: "https://github.com/haleyparks329/the-human-model"
order: 1
---

The Human Model is the structured model of me that my agents read instead of chat history: workouts, check-ins, health data, messages, predictions and outcomes, each with its source. Its first real application predicts my next session. Several models run every night, an ensemble combines them, and each is scored against what I actually lifted.

The public repository has the prediction engine with a synthetic athlete (`python -m human_model_lift backtest`), the findings from my science journal, including the experiments that failed, and the architecture behind it. The production system is private because it holds my health data.
