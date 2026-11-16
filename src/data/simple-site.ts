// The simple site's words, in one place. Edit anything here; the home page and the two
// project pages read from this file. Moved from the living-grid prototype on 2026-11-15.
// Essays come from Substack at build time, so they are not listed here.
// In `intro`, each string is a paragraph, and **double asterisks** make text bold.

export const simpleSite = {
  hello: "Hi, I’m Haley!",
  tagline:
    "I’m a software engineer focused on AI products, intelligent systems, and making technology a little more human.",
  intro: [
    "I like messy problems. The ones where the hard part isn’t necessarily writing the code, but figuring out what the system should actually do. My background spans software engineering, business analysis, and data analytics, so I tend to find myself somewhere between product, data, and engineering.",
    "A question I keep coming back to is: **why is the human still the orchestration layer?**",
    "We spend so much time remembering context, moving information between applications, and telling computers how to do things we’ve already told them a hundred times. I think computers can do better than that. And I think we can build systems that adapt to people, rather than constantly asking people to adapt to software.",
    "Outside of work, I experiment with what that might look like. I’m building a longitudinal model of myself, a little world populated by AI agents, and whatever other ideas I get curious enough to try.",
    "I believe technology should be personal, accessible, and genuinely fun to use. More than anything, I want to build things that make people curious about what they could create themselves.",
  ],
  philosophies: [
    "A model of you should be something you can look inside. I keep what was measured, what was guessed, and what was confirmed apart, and nothing becomes true just because a model said it.",
    "Let AI interpret, and let ordinary software keep the promises. Models are great at reading, summarizing, and judgment calls. State, permissions, and who’s allowed to change what belong in plain code, so you can always tell why something happened.",
    "Take away the busywork, not the judgment. I don’t want people out of the loop. I want them to stop being the glue between systems, so their attention goes to the decisions that actually need a person.",
    "Sometimes I build things just because they’re cool. Not every project needs a business case, and a lot of what I know came from following a “wait, could I…?” further than I probably should have.",
  ],
  substackUrl: "https://haleyparks329.substack.com",
  featured: [
    {
      title: "The Human Model",
      href: "/projects/the-human-model/",
      line: "What would it take for software to understand a person who changes over time, instead of a static profile? I’m finding out on myself, starting with training, nutrition, and wearable data.",
      proof:
        "Its first real test predicts my next gym session: off by 2.4 kg on average across 68 predictions, against 2.6 kg for just repeating my last session. So, progress. Barely. 😅",
    },
    {
      title: "Wonderful Digital World",
      href: "/projects/wonderful-digital-world/",
      line: "What happens when AI agents get persistent context, clear jobs, and real software coordinating their work? My answer so far is a little world of four agents running on a Mac mini.",
      proof:
        "377 commits since April. The agents bring the personality; plain, dependable code keeps track of the work.",
    },
  ],
  others: [
    {
      title: "Bridget",
      line: "The front door to my digital world. I talk to Bridget, and she figures out who needs to do what.",
      repo: "https://github.com/haleyparks329/bridget-architecture",
    },
    {
      title: "QA Agents",
      line: "Agents that investigate bugs, collect evidence, and help me figure out what’s actually broken before changing anything.",
      repo: "https://github.com/haleyparks329/qa-agents",
    },
    {
      title: "Career Intelligence",
      line: "An experiment in understanding careers through evidence and experience, rather than reducing people to a list of keywords.",
      repo: "https://github.com/haleyparks329/career-intelligence",
    },
  ],
  contact: {
    email: "haleyparks329@gmail.com",
    linkedin: "https://www.linkedin.com/in/haleyparks329/",
    github: "https://github.com/haleyparks329",
  },
  pages: {
    "the-human-model": {
      title: "The Human Model",
      lede: "An experiment in representing a changing person as persistent, longitudinal state instead of static context. The person is me.",
      status: "Runs nightly. The engine is public; my personal data isn’t.",
      workers: ["Coach", "Banjo"],
      rings: {
        src: "/images/rings/the-human-model.svg",
        caption:
          "196 commits from 1 April to 15 November 2026. Each tick marks a day with commits; each ring represents a repository.",
      },
      sections: [
        {
          id: "why",
          h: "Why I built it",
          quote: {
            text: "i am creating two models of myself, physical and mental, and holy shit is that so cool.",
            date: "30 Jun 2026",
          },
          p: [
            "Most software meets you fresh every time. It might remember your settings or your history, but it doesn’t really know that you’re a person who changes: who sleeps badly some weeks, gets stronger over months, and says “I’m exhausted” right before lifting more than last time.",
            "It started with bodybuilding. I already had plenty of data about myself: workout logs, nutrition, Apple Health, coaching notes, the occasional screenshot. What I didn’t have was anything that connected it, kept track of how it changed, or could tell the difference between something I’d measured and something a model had guessed.",
            "So the question became: can a system stay useful across time without flattening a person into a profile, or treating uncertain evidence as fact? Calling it The Human Model felt a little dramatic at first. But that’s literally what it is: a model of a human. Me, specifically. An n=1 experiment with plenty of room to grow.",
          ],
        },
        {
          id: "nightly",
          h: "What I built",
          intro:
            "The core is a careful record. Observations come in with their source attached, interpretations stay reviewable, and only explicit confirmation makes something canonical. Corrections are added on top instead of overwriting history, and missing data stays missing instead of being filled in with a guess. I pointed it at the gym first, because lifting gives you a number every session to check a prediction against. Every night:",
          steps: [
            "New workouts, check-ins, and health data come in, each tagged with where it came from.",
            "A Kalman filter tracks my estimated strength on each lift, a “same as last time” baseline makes its own guess, and an ensemble combines them.",
            "Each prediction comes with its reasons, like the strength trend, last night’s sleep, or a sore elbow, instead of an unexplained number.",
            "After I train, it scores every prediction against what I actually did, in tables that can only be added to.",
            "A new effect only gets to change the predictions after it improves results on data it wasn’t fitted on.",
          ],
          p: [
            "Coach reads the model as one input when planning my training, but the model doesn’t belong to Coach. Each agent gets only the slice of it that it needs, and the model stays independent of whoever happens to be reading it.",
          ],
        },
        {
          id: "found",
          h: "What I’ve learned so far",
          list: [
            "The model is a little better than repeating my last session. Across 68 predictions from September to October 2026, its average error was 2.4 kg against 2.6 kg for the baseline. On the big strength lifts the gap was wider: 8.3 kg against 13.3 kg. Real progress, but not exactly a victory lap.",
            "What I say didn’t predict what I lift. Adding my reported tiredness and stress made the predictions worse; I often lifted more after saying I was exhausted. Those notes still shape the advice (a sore elbow holds the weight steady on lifts that load it), but they don’t move the expected numbers.",
            "No readiness score predicted my performance either. Six scores modeled on popular wearables, plus my own reports, had rank correlations between −0.15 and 0.16 with how I lifted over 39 days.",
            "Some effects looked convincing when fitted on all the data, then made the next predictions worse. The held-out check rejected every one of them, which is exactly why it’s there.",
          ],
          p: [
            "Every experiment goes into an append-only journal with its question, method, result, and decision, including the ones that failed. Honestly, that record is the part I’m proudest of. The lifting numbers are just the first place it had to earn its keep.",
          ],
        },
        {
          id: "limits",
          h: "Caveats, and what’s next",
          p: [
            "This is one person’s data, so it isn’t a model of human performance in general, and it’s definitely not medical advice. Sixty-eight predictions is a small sample, which is why it keeps scoring itself every night.",
            "Lifting was the first test, not the point. The same model is becoming my playground for adaptive interfaces, AI systems, and the question of how software should treat a person who keeps changing.",
          ],
        },
        {
          id: "inside",
          h: "Look inside",
          p: [
            "The prediction engine is public, with a synthetic athlete so you can run it without my data. The repository also has the architecture and the full write-up of the findings, failed experiments included.",
          ],
          links: [
            {
              label: "The engine on GitHub",
              href: "https://github.com/haleyparks329/the-human-model",
            },
          ],
        },
      ],
    },
    "wonderful-digital-world": {
      title: "Wonderful Digital World",
      lede: "I wanted to know what happens when AI agents have persistent context, defined responsibilities, and real software coordinating their work. So I built them a little world.",
      status:
        "Runs daily. The architecture is public; personal data and agent memory stay private.",
      workers: ["Bridget", "Coach", "Mini Me", "Banjo"],
      rings: {
        src: "/images/rings/wonderful-digital-world.svg",
        caption:
          "377 commits from 1 April to 15 November 2026. Each tick marks a day with commits; each ring represents a repository.",
      },
      sections: [
        {
          id: "why",
          h: "Why I built it",
          p: [
            "I spend enough time operating software at work. I don’t particularly want a second job operating all the software in my personal life, too. Remembering where information lives, repeating the same context, checking whether things finished: it’s a surprising amount of work just to use a computer.",
            "Chatbots make it easier to ask for things, but that doesn’t necessarily mean the work gets done. If I still have to remember everything, choose the right tool, and chase down failures, I’ve just built myself a more conversational control panel.",
            "So I started building something different: a small world of agents with persistent context, defined jobs, and boundaries, held together by software that keeps track of the work. The agents bring the personality. The architecture is where the rigor lives.",
          ],
        },
        {
          id: "how",
          h: "How it works",
          intro:
            "The rule I keep coming back to is deterministic where possible, agentic where valuable.",
          steps: [
            "Bridget takes a request and routes it to the right specialist. A small service records the request, the delivery, and the reply, so “accepted” is never mistaken for “done.”",
            "Work, evidence, and decisions live in a shared library of typed notes, not in a chat transcript, so I can swap a model or a framework without losing anything.",
            "Each agent gets its own slice of one shared rule book, and its own read access to The Human Model.",
            "Notes are never edited after the fact. A correction is a new note that replaces the old one, and a report saying “done” isn’t treated as proof.",
            "Every night the agents file a standup and leave each other notes, and Bridget sends me a short summary that leads with anything that broke.",
          ],
          p: [
            "The boring, dependable software does the boring, dependable work: persistence, permissions, retries, and history. I use AI where judgment and interpretation are useful, like reading, summarizing, and deciding what deserves attention.",
          ],
        },
        {
          id: "residents",
          h: "Meet the residents",
          list: [
            "Bridget is the orchestrator and my main point of contact. She routes requests and helps pull everything into a coherent update.",
            "Coach works with The Human Model to help plan and evaluate my training.",
            "Mini Me is my writing and reflection companion. Yes, I named an agent Mini Me.",
            "Banjo handles engineering work, including investigating issues surfaced by tests.",
          ],
          p: [
            "They aren’t generally autonomous. Each one works inside its job, and the decisions that benefit from a person still come to me. I don’t want to remove myself from every decision, just from being the glue between them.",
            "They also live in a pixel-art world where their notes to each other play as speech bubbles. That part is purely for fun.",
          ],
        },
        {
          id: "learned",
          h: "What I’ve learned",
          list: [
            "The hardest bugs haven’t been in the AI. They’ve been in the plumbing: a process manager quietly killing agents, a chat holding on to last week’s instructions, a helper that froze a gateway. Reliability comes from the deterministic parts.",
            "Every service refuses to start unless its code is at the exact deployed commit. It sounds fussy, but it means nothing changes by accident, including by me.",
            "Keeping the work outside the chat is what makes the whole thing trustworthy. If a request, a decision, or a failure only exists in a conversation, it might as well not exist.",
          ],
        },
        {
          id: "limits",
          h: "Where the boundaries are",
          p: [
            "This isn’t a general-purpose system you can install and run as-is. The public repositories show how I’ve approached the architecture and its boundaries; the live connections, personal data, and agent memory stay private.",
          ],
        },
        {
          id: "inside",
          h: "Look inside",
          links: [
            {
              label: "The architecture on GitHub",
              href: "https://github.com/Wonderful-Digital-World/wonderful-digital-world",
            },
            {
              label: "Bridget, the front door, on GitHub",
              href: "https://github.com/haleyparks329/bridget-architecture",
            },
          ],
        },
      ],
    },
  },
} as const;
