---
title: About
layout: page
---
<main class="about-profile">
  <header class="about-profile__hero">
    <div class="about-profile__portrait-wrap">
      <img class="about-profile__portrait" src="{% if site.external-image %}{{ site.picture }}{% else %}{{ site.picture | relative_url }}{% endif %}" alt="Portrait of Ccaarrrllll">
      <span class="about-profile__portrait-index">About Me</span>
    </div>
    <div class="about-profile__intro">
      <p class="about-profile__eyebrow"><span></span> wrecking baller / osint researcher / terminal red bull addict</p>
      <h1>Ccaarrrllll<span>.</span></h1>
      <p class="about-profile__dek">Former collegiate Overwatch player, now trying my best at open-source intelligence research, hacking, and social engineering.</p>
    </div>
  </header>

  <hr class="about-profile__divider">

  <section class="about-profile__section about-profile__story">
    <div class="about-profile__section-label"><span>01</span>MY STORY</div>
    <div class="about-profile__section-body">
      <h2>I used to play video games for money.</h2>
      <p>In college, I was on scholarship to play Overwatch, a team-based first-person shooter. Between matches and practices, I studied cybersecurity and tried to figure out which discipline I wanted to focus on.
      <br><br>
      The truth? All the boring, event watching, ticket closing, and policy making part of cyber just put me to sleep. So by process of elimination, I was left with the fun stuff: doing bad stuff with permission; otherwise known as pentesting and social engineering.
      <br><br>
      As I started to gain more experience in the industry, I discovered a knack for finding interesting intelligence or breaking news to my organization before larger cyber media outlets. Ever since, I've been chasing the next lead and pulling strings to see what peculiar things I can find.</p>
    </div>
  </section>

  <section class="about-profile__section">
    <div class="about-profile__section-label"><span>02</span> CURRENT INTERESTS</div>
    <div class="about-profile__focus-list">
      <article class="about-profile__focus-item">
        <span class="about-profile__focus-number">></span>
        <div><h3>Open-source intelligence</h3><p>Finding and connecting information that's publicly available.</p></div>
      </article>
      <article class="about-profile__focus-item">
        <span class="about-profile__focus-number">></span>
        <div><h3>Network penetration testing &amp; social engineering</h3><p>Breaking into systems through technical and human exploits.</p></div>
      </article>
      <article class="about-profile__focus-item">
        <span class="about-profile__focus-number">></span>
        <div><h3>Esports &amp; creative media</h3><p>Still playing Overwatch and making content (sometimes).</p></div>
      </article>
    </div>
  </section>

  <section class="about-profile__section about-profile__credentials">
    <div class="about-profile__section-label"><span>03</span> CREDENTIALS</div>
    <div class="about-profile__credential-note">
      <span class="about-profile__credential-mark">></span>
      <div>
        <h2>Certifications</h2>
        <ul class="about-profile__credential-list">
          <li><strong>Practical Junior Penetration Tester (PJPT)</strong><span>TCM Security</span></li>
          <li><strong>Practical Network Penetration Tester (PNPT)</strong><span>TCM Security</span></li>
          <li><strong>Practical OSINT Research Professional (PORP)</strong><span>TCM Security</span></li>
          <li><strong>AZ-900</strong><span>Microsoft</span></li>
          <li><strong>Security+</strong><span>CompTIA <em>Expired</em></span></li>
        </ul>
      </div>
    </div>
  </section>

</main>
