---
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
css: unocss

---

<img src="/assets/logo.svg" h-15 mt--35 fixed c-white>

# MAL
### Meta Attack Language


<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
</div>

---

# Purpose

- Design di linguaggi domain-specific;
- Fornisce un formalismo che consente la generazione semi-automatizzata e il calcolo efficiente di "grafi di attacco" [^1] molto grandi; per esempio, un attaccante può
  1. Compromettere un host
  2. Trovare le credenziali salvate
  3. Utilizzare le credenziali per accedere ad un altro host
- Il risultato finale di una simulazione è quello di stimare il tempo impiegato in ciascun passaggio per eseguire l'attacco.

[^1]: Grafi diretti che rappresentano le dipendenze tra i passaggi che possono essere eseguiti dall'attaccante.

<style>
.footnotes-sep {
  @apply mt-20 opacity-10;
}
.footnotes {
    @apply text-2.3 opacity-75;
}
/* .footnote-backref {
  display: none;
} */
</style>

---

# Modelling only security languages

- **CORAS**: Common Object-oriented Representation of Attack Scenarios
- **secureTROPOS**: Secure Threat and Risk Object-oriented Process
- **SecDSVL**: Secure Domain Specific Vulnerability Language

Questi linguaggi permettono di modellare le proprietà di sicurezza di un sistema, ma non sono in grado di fornire alcuno strumento automatico per analizzare o inferire conclusioni sulla sicurezza del modello stesso.

---

# Formalism for Thread Modeling

<style>
  .slidev-layout {
    @apply text-2.3 opacity-75;
  }
</style>

- Sia $x$ un'**entità del dominio**, ad esempio, un'entità potrebbe essere un diamante $myDiamond$, un'altra una cassaforte $myVault$.
- Gli oggetti sono divisi in un set di **classi** $X=\{X_1, ..., X_n\}$, e.g.

  $$
    myDiamond \in Jewelry \\
  $$ 
  
  e

  $$
    myVault \in Vault
  $$

- A ciascuna classe è associato un set di **step di attacco** $A(X_i)$.
  - Denotiamo con $X.A$ lo step di attacco per l'oggetto nella classe $X$.
  - Esempi di step di attacco possono essere $Jewelry.steal$ o $Vault.open$.
- Un **link** è una tupla di oggetti, ciascuuno appartenente ad una classe diversa, e rappresenta una dipendenza tra gli oggetti, e.g.
  $$
    \lambda = (x_i,x_j)
  $$
  - Ad esempio, $myVault$ potrebbe avere un link $containment$ con $myDiamond$, che rappresenta il fatto che la cassaforte può contenere il diamante.
- I link sono divisi in set di **associazioni** $\Lambda = \{\Lambda_1,...,\Lambda_n\}$, che collega una classe all'altra, e.g.
  $$
    x_i,x_k \in X_m, x_j, x_l \in X_n | \lambda_1=(x_i,x_j) \in \Lambda, \lambda_2=(x_k,x_l) \in \Lambda
  $$