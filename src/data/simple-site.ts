// The simple site's words, in one place. Edit anything here; the home page and the two
// project pages read from this file. Moved from the living-grid prototype on 2026-11-15.
// Essays come from Substack at build time, so they are not listed here.

export const simpleSite = {
  hello: "Hi, I’m Haley!",
  tagline: "I build human-centered software.",
  intro:
    "I’m an AI product engineer: I build agent systems and a model of me that do the computer things, so I get to do the human things.",
  philosophies: [
    "Technology is supposed to be fun, not sterile. It should feel like it was made for you.",
    "I shouldn’t have to tell the computer what to do. It should know me well enough to do as much as it can on its own.",
    "Most AI automation just adds work, because you still have to review work you didn’t do. I build systems you can trust, so only the things that need me reach me.",
    "I can deal with ugly. I can’t deal with annoying.",
  ],
  substackUrl: "https://haleyparks329.substack.com",
  featured: [
    {
      title: "The Human Model",
      href: "/projects/the-human-model/",
      line: "A model of me that predicts my next training session every night, then checks itself against what I actually lifted.",
      proof:
        "Over 68 predictions it was off by 2.4 kg on average. Repeating the last session was off by 2.6 kg.",
    },
    {
      title: "Wonderful Digital World",
      href: "/projects/wonderful-digital-world/",
      line: "Four AI agents that run my life’s operations on a Mac mini. They share one library and report to me every night.",
      proof:
        "377 commits since April. Bridget is their front door: I talk to her, and she sends each request to the right agent.",
    },
  ],
  others: [
    {
      title: "Bridget",
      line: "The front door to my agents. I talk to her in chat, and she sends each request to the right one.",
      repo: "https://github.com/haleyparks329/bridget-architecture",
    },
    {
      title: "QA Agents",
      line: "Agents that investigate bugs and bring me evidence before anyone acts on it.",
      repo: "https://github.com/haleyparks329/qa-agents",
    },
    {
      title: "Career Intelligence",
      line: "A tool that reasons about careers from evidence instead of keywords.",
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
      lede: "A model of me that guesses what I’ll lift in my next session, every night, and then checks itself against what I actually lifted.",
      status: "Runs every night. The engine is public; my data stays private.",
      workers: ["Coach", "Banjo"],
      rings: {
        src: "/images/rings/the-human-model.svg",
        caption:
          "196 commits from 1 April to 15 November 2026, one ring per repository. Each tick is a day with commits.",
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
            "My data was all over the place: workout logs, nutrition apps, Apple Health, coaching notes, screenshots. Each app had a piece of me. None of them kept the whole picture, or remembered how it changed.",
            "I didn’t want another dashboard. I wanted one place my agents could read instead of guessing.",
            "I felt kind of cheesy naming it The Human Model. Now it makes sense. I’m literally modelling myself.",
          ],
        },
        {
          id: "nightly",
          h: "What it does every night",
          steps: [
            "It takes in what I logged, and keeps where each piece came from.",
            "Several models predict my next session, and an ensemble combines them.",
            "Every number comes with the reason it moved.",
            "After the session, it scores itself against what I actually lifted.",
            "Only effects that pass a held-out check can change what it expects.",
          ],
          p: [
            "Coach reads it every night to plan my training. None of my agents own it.",
          ],
        },
        {
          id: "found",
          h: "What it found",
          list: [
            "It beats “same as last time”, a little. Over 68 predictions from September to October 2026 it was off by 2.4 kg on average. Repeating the last session was off by 2.6 kg.",
            "How tired or stressed I said I was didn’t predict what I lifted. Adding it made the predictions worse.",
            "Effects fitted on all the data looked real, then made the next predictions worse. The held-out rule turned all of them down, which was the right call.",
          ],
        },
        {
          id: "limits",
          h: "What it isn’t",
          p: [
            "It isn’t medical advice, and a model of me says nothing about you. 68 predictions is a small sample, so the nightly scoring has to keep proving it.",
          ],
        },
        {
          id: "inside",
          h: "Look inside",
          p: [
            "The prediction engine is public. It runs on a synthetic athlete, so you can try it without my data.",
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
      lede: "Four AI agents that run my life’s operations. They share one library, hand work to each other, and report to me every night.",
      status:
        "Runs every day. The architecture is public; the agents’ memory and my data stay private.",
      workers: ["Bridget", "Coach", "Mini Me", "Banjo"],
      rings: {
        src: "/images/rings/wonderful-digital-world.svg",
        caption:
          "377 commits from 1 April to 15 November 2026, one ring per repository. Each tick is a day with commits.",
      },
      sections: [
        {
          id: "why",
          h: "Why I built it",
          p: [
            "A lot of using software is really me running the control panel: remembering where things live, moving them between tools, repeating context, and checking whether something actually finished.",
            "A chatbot can make a command easier to type and still leave everything underneath to me. If I still have to remember the context, pick the tool, notice it failed and try again, nothing really changed.",
            "I don’t want AI to take the interesting human part. I want the computer to take more of the computer part.",
          ],
        },
        {
          id: "how",
          h: "How it works",
          steps: [
            "Anything that comes in is saved first, along with where it came from.",
            "It becomes a piece of work that can be passed along and tracked.",
            "The agent that picks it up gets only the context and permissions its job needs.",
            "The part of the system that owns that data decides whether a change goes through.",
            "The change is made or proposed, or the unknown stays open instead of being guessed.",
          ],
          p: [
            "Plain software handles the parts that need guarantees: saving, permissions, retries and history. AI handles the fuzzy parts: reading, summarizing and prioritizing.",
          ],
        },
        {
          id: "residents",
          h: "Who lives there",
          list: [
            "Bridget is the front door. She sends each request to the right agent and writes my morning report.",
            "Coach plans my training from The Human Model.",
            "Mini Me is my writing partner.",
            "Banjo is the engineer. He fixes what the nightly tests find.",
          ],
          p: [
            "The point isn’t to take me out of the loop. It’s to move me to the part of the loop where being human is useful.",
          ],
        },
        {
          id: "limits",
          h: "What it isn’t",
          p: [
            "It isn’t general autonomy, and it isn’t something you can install. The public code shows the boundaries. The agents’ memory, my data and the live connections stay private.",
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
