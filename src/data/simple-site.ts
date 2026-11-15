// The simple site's words, in one place. Edit anything here; the home page and the two
// project pages read from this file. Moved from the living-grid prototype on 2026-11-15.
// Essays come from Substack at build time, so they are not listed here.

export const simpleSite = {
  hello: "Hi, I’m Haley!",
  tagline: "I build human-centered software.",
  intro:
    "I’m an AI engineer who likes building things that make computers work a little harder, so humans don’t have to. Lately, that means personal models, AI agents, and a lot of experiments on myself.",
  philosophies: [
    "Technology should be fun. I want software that feels personal, not like another control panel I have to learn.",
    "I don't want to spend my life telling computers what to do. I'd rather build systems that know enough about me to figure out the next step.",
    "Automation isn't very helpful if I have to supervise every single thing it does. The interesting engineering problem is figuring out what I can actually trust it to handle.",
    "I can forgive ugly software. Annoying software is another story.",
  ],
  substackUrl: "https://haleyparks329.substack.com",
  featured: [
    {
      title: "The Human Model",
      href: "/projects/the-human-model/",
      line: "I'm building a model of myself. Right now, one experiment is trying to predict what I'll lift before I walk into the gym.",
      proof:
        "Across 68 predictions, the average error was 2.4 kg. Guessing I'd repeat my last session came in at 2.6 kg. So, progress. Barely. 😅",
    },
    {
      title: "Wonderful Digital World",
      href: "/projects/wonderful-digital-world/",
      line: "My little world of AI agents, running on a Mac mini. They have jobs, share context, and help keep my projects and everyday systems moving.",
      proof:
        "377 commits since April. Bridget is the front door, and the other agents each have their own responsibilities.",
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
      line: "Agents that investigate bugs, collect evidence, and help me figure out what's actually broken before changing anything.",
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
      lede: "What happens when you treat yourself as a longitudinal modeling problem? I decided to find out.",
      status: "Runs nightly. The engine is public; my personal data isn't.",
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
            "I had years of information about myself scattered across workout logs, nutrition apps, Apple Health, coaching notes, and the occasional screenshot. Plenty of data, but no real way to understand how it all fit together or changed over time.",
            "I didn't want another dashboard showing me numbers I could already find somewhere else. I wanted a system that could connect them, learn from them, and give my agents a shared understanding of the person they're supposed to be helping.",
            "At first, calling it The Human Model felt a little dramatic. But that's literally what I'm trying to build: a model of a human. Me, specifically. An n=1 experiment with a lot of room to grow.",
          ],
        },
        {
          id: "nightly",
          h: "What happens every night",
          steps: [
            "New observations come in from my connected data sources, with their provenance intact.",
            "Multiple models estimate what I might do in my next training session, and an ensemble combines their predictions.",
            "The system records what influenced each estimate, rather than handing me an unexplained number.",
            "Once I've trained, it compares the predictions with what I actually did.",
            "New effects have to prove themselves on held-out data before they're allowed to influence future predictions.",
          ],
          p: [
            "Coach uses the model as one input when planning my training. The Human Model itself stays independent of whichever agent happens to be reading it.",
          ],
        },
        {
          id: "found",
          h: "What I've learned so far",
          list: [
            "The model is a little better than repeating my last session. Across 68 predictions from September to October 2026, its mean absolute error was 2.4 kg versus 2.6 kg for the baseline. That's an improvement, but not exactly a victory lap.",
            "My self-reported fatigue and stress didn't improve the predictions. In fact, adding them made the results worse.",
            "Some effects looked convincing when fitted on all the data, then failed when tested on observations they hadn't seen. The held-out checks rejected them. That's exactly why I put the checks there.",
          ],
        },
        {
          id: "limits",
          h: "The important caveats",
          p: [
            "This is an experiment on one person, not a universal model of human performance or a source of medical advice. Sixty-eight predictions are also nowhere near enough to declare the problem solved. That's why it keeps evaluating itself every night.",
          ],
        },
        {
          id: "inside",
          h: "Look inside",
          p: [
            "The prediction engine is public, with a synthetic athlete you can use to explore it without needing access to my personal data.",
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
      lede: "I gave my AI agents a little world of their own. They have responsibilities, shared context, and actual software keeping them accountable.",
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
            "I spend enough time operating software at work. I don't particularly want a second job operating all the software in my personal life, too. Remembering where information lives, repeating the same context, checking whether things finished: it's a surprising amount of work just to use a computer.",
            "Chatbots make it easier to ask for things, but that doesn't necessarily mean the work is done. If I still have to remember everything, choose the right tool, and chase down failures, I've just built myself a more conversational control panel.",
            "So I started building something different: a small world of agents that can coordinate, remember, and do the computer work while I get on with being a human. That's the idea, anyway. The engineering is the interesting part.",
          ],
        },
        {
          id: "how",
          h: "How it works",
          steps: [
            "Incoming information is recorded with its source, so the system can trace where it came from.",
            "Requests become trackable work instead of disappearing into a chat transcript.",
            "Each agent gets the context and permissions appropriate to its job.",
            "The system responsible for a piece of data decides whether a proposed change is allowed.",
            "Work is completed, proposed for review, or left explicitly unresolved. Unknowns don't magically become facts.",
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
            "I don't want to remove myself from every decision. I want to spend my attention on the decisions that actually benefit from having a person involved.",
          ],
        },
        {
          id: "limits",
          h: "Where the boundaries are",
          p: [
            "This isn't a general-purpose autonomous system you can install and run as-is. The public repositories show how I've approached the architecture and its boundaries; the live connections, personal data, and agent memory remain private.",
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
