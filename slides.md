---
theme: ./theme
# theme: seriph
themeConfig:
  primary: '#2A9D8F'
background: https://source.unsplash.com/collection/4540043/1920x1080
class: text-center
highlighter: shiki
lineNumbers: true
info: false
drawings:
  persist: false
transition: slide-left
css: unocss
title: MAL
monaco: true
# canvasWidth: 1920

---

# Pitch

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<!-- <div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
</div> -->

---
layout: section
---

# MAL
### Meta Attack Language

---

# Purpose

- Design di linguaggi domain-specific;
- Fornisce un formalismo che consente la generazione semi-automatizzata e il calcolo efficiente di "grafi di attacco" [^1] molto grandi; per esempio, un attaccante può
  1. Compromettere un host
  2. Trovare le credenziali salvate
  3. Utilizzare le credenziali per accedere ad un altro host
- Il risultato finale di una simulazione è quello di stimare il tempo impiegato in ciascun passaggio per eseguire l'attacco.

[^1]: Grafi diretti che rappresentano le dipendenze tra i passaggi che possono essere eseguiti dall'attaccante.

---

# Modelling only security languages

- **CORAS**: Common Object-oriented Representation of Attack Scenarios
- **secureTROPOS**: Secure Threat and Risk Object-oriented Process
- **SecDSVL**: Secure Domain Specific Vulnerability Language

Questi linguaggi permettono di modellare le proprietà di sicurezza di un sistema, ma non sono in grado di fornire alcuno strumento automatico per analizzare o inferire conclusioni sulla sicurezza del modello stesso.

---
layout: two-cols-header
---
# Formalism for Threat Modeling

<style>
  .slidev-layout{ 
    p, li{
      @apply text-2.3 opacity-75;
    }
  }
</style>

::left::

- Sia $x$ un'**entità del dominio**, ad esempio, un'entità potrebbe essere un diamante $cullinanDiamond$, un'altra una cassaforte $antwerpVault$.
- Gli oggetti sono divisi in un set di **classi** $X=\{X_1, ..., X_n\}$, e.g.

  $$
    cullinanDiamond \in Jewelry \\
  $$ 
  
  e

  $$
    antwerpVault \in Vault
  $$

- A ciascuna classe è associato un set di **step di attacco** $A(X_i)$.
  - Denotiamo con $X.A$ lo step di attacco per l'oggetto nella classe $X$.
  - Esempi di step di attacco possono essere $Jewelry.steal$ o $Vault.open$.
- Un **link** è una tupla di oggetti, ciascuuno appartenente ad una classe diversa, e rappresenta una dipendenza tra gli oggetti, e.g.
  $$
    \lambda = (x_i,x_j)
  $$
::right::
  - Ad esempio, $antwerpVault$ potrebbe avere un link $containment$ con $cullinanDiamond$, che rappresenta il fatto che la cassaforte può contenere il diamante.
- I link sono divisi in set di **associazioni** $\Lambda = \{\Lambda_1,...,\Lambda_n\}$, che collega una classe all'altra, e.g.
  $$
    x_i,x_k \in X_m, x_j, x_l \in X_n | \lambda_1=(x_i,x_j) \in \Lambda, \lambda_2=(x_k,x_l) \in \Lambda
  $$
- Nelle associazioni, le classi ricoprono dei **ruoli** $\Psi(X_i,\Lambda)$.
  - Ad esempio, $antwerpVault$ potrebbe avere il ruolo $container$ nella relazione $containment$.
  - Analogamente, a livello di istanze, 
    $$
      \psi(x_i,\Lambda) = \{x_j | x_i,x_j \in \lambda \wedge \lambda \in \Lambda\}
    $$
    Ad esempio,
    $$
      antwerpVault.contained = \{cullinanDiamond,lesothoPromise\}
    $$
- Navigando tra le associazioni, gli step di attacco possono essere connessi tra di loro attraverso degli archi diretti $e \in E$.
  $$
    e=(X_i,A_k,X_j,A_l) | X_j = \Psi(X_i,\Lambda)
  $$
- Una connessione tra due step di attacco implica che dal primo step si può passare al secondo, e.g.
$$
  e = (Vault.open, Vault.contained.steal), e \in E
$$
sta a significare che se si riesce ad aprire la cassaforte, si possono rubare i diamanti contenuti.

---
layout: two-cols-header
disabled: false
---

# Formalism for Threat Modeling (cont.)

<style>
  .slidev-layout{ 
    p, li{
      @apply text-2.3 opacity-75;
    }
  }
</style>

::left::

- Una classe obbligatoria è il singleton **Attacker**, $\Xi \in X$, contenente un singolo step di attacco $\Xi.\xi$, il quale rappresenta il punto di partenza dell'attacco sul modello del sistema.
- Per ciascuno step di attacco $A(X_i)$, è definito un **tempo di attacco locale** (stimato) $\phi(A) = P(T_{loc}(A)=t)$.
  - Per esempio, il tempo di attacco locale per aprire la cassaforte potrebbe essere specificato da una distribuzione Gamma, con media 12 e deviazione standard di 6 ore,
  $$
    \phi(antwerpVault.open) = Gamma(24,0.5)
  $$
- Gli step di attacco possono essere di tipo $AND$ o $OR$, $t(X.A) \in \{OR,AND\}$
  - $OR$ significa che l'attaccante può iniziare lo step di attacco se almeno uno dei passaggi precedenti è stato completato.
  - $AND$ significa che l'attaccante può iniziare lo step di attacco solo se tutti i passaggi precedenti sono stati completati.
  - Per esempio, se $t(Vault.open)=AND$ e
  $$
    (myVault.compromise, myVault.open) \in E
  $$
  e
  $$
    (myVaultPhysicalLocation.access, myVault.open) \in E
  $$
  allora, per poter aprire la cassaforte, è necessario che l'attaccante sia riuscito a compromettere il sistema (ottenere la chiave della cassaforte) **e** ad accedere alla sua posizione fisica.
::right::
- La distribuzione di probabilità del tempo totale richiesto per completare l'attacco è definita come
  $$
    \Phi(A) = P(T_{glob}(A)=t)
  $$
- Oltre a definire gli step di attacco, le classi possono anche prevedere delle **difese** $D(X_i)$, che rappresentano le azioni che possono essere intraprese per prevenire l'attacco. Utilizziamo $X.D$ per indicare la difesa per l'oggetto nella classe $X$.
  - Una difesa può essere $TRUE$ o $FALSE$, $s(D) \in \{TRUE,FALSE\}$, che indica se la difesa è attiva o meno.
  - Ad esempio, $Vault.timeLocked$ può essere $TRUE$ o $FALSE$.
  - Una difesa può essere genitore di uno step di attacco, $(X_i.D, X_j.A) \in E$, e.g.
  $$
    (Vault.timeLocked, Vault.open) \in E
  $$
  che significa che se la cassaforte è bloccata per un certo periodo di tempo ($Vault.timeLocked = TRUE$), allora non è possibile aprire la cassaforte.

---

# Global time to compromise

Il calcolo del tempo globale per compromettere il sistema non solo tiene conto dei tempi locali per ciascuno step di attacco, ma anche dell'ordine di esecuzione degli step di attacco stessi.

Ad esempio, un attaccante con scarse capacità di pianificazione potrebbe essere modellato attraverso una "random walk" sul grafo degli step di attacco. In tal caso, la distribuzione di probabilità per la scelta del prossimo step di attacco è uniforme.

Un attaccante esperto, invece, sceglie sempre il **percorso minimo** per raggiungere lo step di attacco successivo.

---
layout: center
---

<style>
  .slidev-layout p{
    @apply text-3 leading-4;
  }
</style>

# Il Meta Attack Language

Il modello matematico sopra descritto potrebbe essere codificato con un linguaggio di programmazione, come ad esempio Java, ma è molto più semplice utilizzare un linguaggio di alto livello, come il Meta Attack Language (MAL).

Gli autori hanno realizzato un compilatore che, a partire da una descrizione del modello in MAL, genera del codice in Java, che può essere utilizzato per calcolare il tempo globale per compromettere il sistema.

---

# Il Meta Attack Language
## Classi

Come specificato sopra, le classi sono le entità fondamentali di una specifica MAL. Una classe è definita come segue:

```java
class Channel{
  | transmit
    -> parties.connect
}
```

- Il simbolo `|` indica che lo step di attacco è di tipo OR; per cui, se almeno uno degli step di attacco genitori è stato completato, allora lo step di attacco può essere iniziato.
- Step di attacco di tipo AND sono indicati con il simbolo `&`, mentre le difese sono indicate con il simbolo `#`.
- La freccia `->` indica che la compromissione dello step di attacco `transmit` apre allo step di attacco `parties.connect`.

---

# Il Meta Attack Language
## Ruoli di associazione

`parties` è un ruolo di associazione, definito in un altro punto della specifica MAL.

```java
associations {
  Machine [parties] 2-* <-- Communication --> * [channels] Channel
}
```

Come per l'UML, le associazioni terminano con una cardinalità, che indica il numero di istanze di una classe che possono essere associate ad un'altra classe. Nell'esempio, un oggetto della classe `Channel` deve essere associato ad almeno 2 istanze della classe `Machine`.

Entrambi gli estremi dell'associazione hanno dei ruoli, che sono utilizzati per la navigazione. Per cui, `myChannel.parties` si riferisce al set di oggetti della classe `Machine` associati a `myChannel`.

---

# Il Meta Attack Language
## Ereditarietà

Per permettere il riuso delle classi, MAL fornisce un meccanismo di ereditarietà, che è simile a quello dei linguaggi di programmazione orientati agli oggetti.

```java
abstractClass Machine { 
  | connect
    -> compromise 
  & compromise
    -> channels.transmit
}
class Hardware extends Machine { 

}
class Software extends Machine {
  & compromise
  -> channels.transmit, 
     executors.connect,
}
```

Nell'esempio, la classe `Machine` è astratta, e non può essere istanziata. Essa viene specializzata nelle classi concrete `Hardware` e `Software`. In particolare, la classe `Software` eredita tutti gli step di attacco e le associazioni. Inoltre, la classe `Software` effettua l'override dello step di attacco `compromise`, aggiungendo un nuovo step di attacco figlio, `executors.connect`.

---

# Il Meta Attack Language
## Tempo di compromissione

Alcuni step di attacco possono essere completati senza nessuno sforzo da parte dell'attaccante. Tuttavia, per altri step di attacco, l'attaccante deve effettuare un certo numero di tentativi prima di riuscire. Questo implica del tempo necessario per completare lo step di attacco. Ad esempio, per crackare una password con un attacco a dizionario, potrebbero essere necessarie 18 ore. Per questo motivo, MAL fornisce un meccanismo per specificare il tempo necessario per completare uno step di attacco.

```java
class Credentials {
  & dictionaryCrack [18.0]
}
```

Certe volte, però, non siamo a conoscenza del tempo esatto necessario per completare uno step di attacco. In questo caso, possiamo far uso di distribuzioni di probabilità.

```java
class Credentials {
  & dictionaryCrack [GammaDistribution(1.5, 15)]
}
```

---

# Il Meta Attack Language
## Difese

Abbiamo visto che le classi possono prevedere delle difese, che rappresentano le azioni che possono essere intraprese per prevenire l'attacco. Tecnicamente, ogni difesa include una fase di attacco. Se la difesa è falsa, allora, al momento dell'istanza, il passaggio di attacco associato è contrassegnato come compromesso.

Ad esempio, le credenziali possono essere crittate, e quindi non possono essere compromesse con un attacco a dizionario.

```java {all|5-6}
class Credentials { 
  | access
    -> compromiseUnencrypted 
  & compromiseUnencrypted
  # encrypted
    -> compromiseUnencrypted
}
```

- Se `Credentials.encrypted` è falso, l'attaccante sarà in grado di raggiungere il passo di attacco `compromiseUnencrypted` non appena ha raggiunto `access`.
- Se, invece, `Credentials.encrypted` è vero, allora `compromiseUnencrypted` non sarà raggiunto, poiché la sua compromissione richiede quella di entrambi i genitori.

---

<style>
  .slidev-layout {
    font-size: 0.8rem !important;
  }
</style>
# Esempio

- Classe [astratta]: `Machine`
  - Specializzazioni: `Hardware` e `Software`
    - Le macchine possono eseguire Software, ad esempio una workstation può eseguire un sistema operativo, che a sua volta può eseguire un'applicazione.
- Due o più macchine possono essere collegate da un `Channel`
  - Ad esempio, un software per browser web può essere collegato a un software server web tramite un canale https.
- Classe: `Credentials`
  - Le istanze possono essere, ad esempio, nomi utente e password o chiavi private.
  - Le credenziali hanno destinazioni (`Machine`), per le quali fungono da autenticazione e possono essere memorizzate sulle macchine.

```java {all} {maxHeight:'180px'}
abstractClass Machine { 
  | connect
    -> compromise 
  | authenticate
    -> compromise
  & compromise
    -> _machineCompromise
  | _machineCompromise
    -> executees.compromise,
       storedCreds.access,
       channels.transmit
}

class Hardware extends Machine {
}

class Software extends Machine {
  & compromise
    -> _machineCompromise,
       executors.connect
}

class Channel {
  | transmit
    -> parties.connect
}

class Credentials {
  | access
    -> compromiseUnencrypted,
       dictionaryCrack
  & compromiseUnencrypted
    -> compromise
  | dictionaryCrack [GammaDistribution(1.5, 15)]
    -> compromise
  | compromise
    -> targets.authenticate
  # encrypted
    -> compromiseUnencrypted
}

associations {
  Machine [executor] 1 <-- Execution --> * [executees] Software
  Machine [parties] 2-* <-- Communication --> * [channels] Channel
  Machine [stores] * <-- Storage --> * [storedCreds] Credentials
  Machine [targets] * <-- Access --> * [authCreds] Credentials
}
```

---

# Esempio (cont.)

```java
abstractClass Machine { 
  | connect
    -> compromise 
  | authenticate
    -> compromise
  & compromise
    -> _machineCompromise
  | _machineCompromise
    -> executees.compromise,
       storedCreds.access,
       channels.transmit
}
```

Considerando gli step di attacco, la classe `Machine` ha due quattro di attacco:
- `compromise` indica che l'attaccante ha ottenuto il controllo della macchina
  - Per raggiungere `compromise`, sia `connect` che `authenticate` devono essere compromessi
- `connect` rappresenta lo stabilimento di una connessione con la `Machine` da parte dell'attaccante
- `authenticate` rappresenta l'autenticazione dell'attaccante sulla `Machine`, tramite le credenziali

Se `compromise` viene raggiunto, allora tutti i `Software` che sono eseguiti sulla `Machine` saranno compromessi. Inoltre, le credenziali memorizzate sulla `Machine` saranno compromesse, e le connessioni sui `Channel` con altre `Machine` saranno compromesse.

---

# Esempio (cont.)

```java {all}
class Hardware extends Machine {
}

class Software extends Machine {
  & compromise
    -> _machineCompromise,
       executors.connect
}
```

La specializzazione `Hardware` non ha alcuno step di attacco aggiuntivo. Invece, la specializzazione `Software` ha un solo step di attacco aggiuntivo: se un `Software` viene compromesso, allora anche il `Software` che lo esegue (`executor`) sarà compromesso.

Ad esempio, se un'applicazione viene compromessa, allora anche il sistema operativo che l'esegue sarà compromesso.

---

# Esempio (cont.)

```java
class Channel {
  | transmit
    -> parties.connect
}
```

La classe `Channel` ha un solo step di attacco: `transmit`. Se `transmit` viene compromesso, allora tutte le `Machine` coinvolte nella comunicazione (`parties`) saranno compromesse.

---

# Esempio (cont.)

```java {all|11-12}
class Credentials {
  | access
    -> compromiseUnencrypted,
       dictionaryCrack
  & compromiseUnencrypted
    -> compromise
  | dictionaryCrack [GammaDistribution(1.5, 15)]
    -> compromise
  | compromise
    -> targets.authenticate
  # encrypted
    -> compromiseUnencrypted
}
```

La classe `Credentials` ha quattro step di attacco. Compromettendo `Machine`, l'attaccante ha accesso alle credenziali. Tuttavia, non è detto che queste siano automaticamente compromesse, poiché potrebbero essere crittate. Infatti, abbiamo qui una *difesa*, `encrypted`.

Infatti
- Se `encrypted` è vero, allora `compromiseUnencrypted` non sarà raggiunto, poiché la sua compromissione richiede quella di entrambi i genitori.
- Se `encrypted` è falso $AND$ l'attaccante ha raggiunto lo step di attacco `access`, allora `compromiseUnencrypted` sarà raggiunto, e di conseguenza `compromise`.

---

# Esempio (cont.)

```java {7-8}
class Credentials {
  | access
    -> compromiseUnencrypted,
       dictionaryCrack
  & compromiseUnencrypted
    -> compromise
  | dictionaryCrack [GammaDistribution(1.5, 15)]
    -> compromise
  | compromise
    -> targets.authenticate
  # encrypted
    -> compromiseUnencrypted
}
```

Tuttavia, c'è un'altra possibilità: l'attacco a dizionario (`dictionaryCrack`).

Questo attacco richiede che venga speso del *tempo* per essere portato a termine. Tale intervallo richiesto è modello tramite una distribuzione di probabilità, in questo caso una distribuzione *gamma*.

---

# Esempio (cont.)

## Specification diagram

<div class="slidev-layout place-content-center" mt--5>
  <img src="/Esempio.png" w-180 rd-5>
</div>

---

# Esempio (cont.)

## Istanziazione

Dalla specifica, possiamo istanziare, in maniera automatica, le classi Java corrispondenti.

```java {all} {maxHeight: '330px'}
Hardware macBook = new Hardware();
Software macOS = new Software();
Software sshClient = new Software();
Credentials sshKey = new Credentials (encrypted=Bernoulli(0.5));

macOS.addExecutor(macBook);
sshClient.addExecutor(macOS);
macOS.addStoredCreds(sshKeys);

Hardware system76 = new Hardware();
Software ubuntu = new Software();
Software sshDaemon = new Software();

ubuntu.addExecutor(system76);
sshDaemon.addExecutor(ubuntu);
sshKey.addTarget(sshDaemon);
sshKey.addTarget(ubuntu16);

Channel sshChannel = new Channel();
sshChannel.addParties(sshClient);
sshChannel.addParties(sshDaemon);

Attacker attacker = new Attacker();
attacker.addAttackPoint(macBook.compromise);
```

<!--
In questo piccolo esempio, si presume che l'attaccante abbia compromesso il sistema operativo macOS di un macBook, forse accedendo localmente mentre la macchina era incustodita. Un sshClient è in esecuzione sul Mac. La regola MAL `Machine.compromise -> executees.compromise` implica che la compromissione di macOS porta direttamente alla compromissione di sshClient. Inoltre, `Machine.compromise -> `storedCreds.access` porta l'attaccante ad accedere alle chiavi SSH sul Mac.

L'accesso, tuttavia, non è sufficiente, poiché le chiavi SSH possono essere crittografate con una passphrase. La probabilità che le chiavi SSH siano effettivamente crittografate è impostata al 50% nell'istanza dell'oggetto sshKey, `Credentials sshKey = new Credentials (encrypted=Bernoulli(0.5))`; 

Se sshKey non è crittografato, l'accesso sarà effettivamente sufficiente per compromettere le chiavi. In caso contrario, l'attaccante dovrà eseguire un attacco a dizionario sulle chiavi, che richiederà del tempo, come indicato da `dictionaryCrack [GammaDistribution(1.5, 15)]`.
Compromettendo sshClient, le regole `Machine.compromise -> channels.transmit` e `Channel.transmit -> parties.connect` consente all'attaccante di connettersi a `sshDaemon.connect`, tuttavia, porterà alla compromissione solo se si raggiunge anche `autenticate`.
Se l'attaccante è riuscito a compromettere la passphrase della chiave SSH, la regola `Credentials.compromise -> target.autenticate` porterà a tale compromissione di sshDaemon. Ciò, a sua volta, consente all'aggressore di connettersi al sistema operativo ubuntu16 sottostante, che viene immediatamente compromesso, poiché le chiavi sono state specificate per fornire l'accesso non solo a sshDaemon ma anche al sistema operativo.

In questo esempio, ci sono solo due distribuzioni stocastiche, la prima che rappresenta la probabilità che la passphrase sia crittografata e la seconda che rappresenta il tempo necessario per decifrare la passphrase nel caso in cui sia effettivamente crittografata. Nessun altro passaggio di attacco in questo esempio dovrebbe richiedere un tempo significativo. Adottando il presupposto di un aggressore perfettamente razionale, possiamo determinare il tempo globale per compromettere, ad esempio, `ubuntu16.compromise` calcolando il percorso più breve dall'attaccante a quella fase di attacco. Nella distribuzione risultante, metà della massa di probabilità sarà localizzata al tempo zero (perché nella metà degli attacchi la passphrase sarà in chiaro, quindi l'accesso sarà immediato), mentre la restante metà sarà distribuita secondo la distribuzione di probabilità del tempo locale al compromesso del `dictionaryCrack`. Questo piccolo modello può essere calcolato manualmente per produrre la distribuzione globale descritta del tempo di compromissione di `ubuntu16.compromise`, ma per modelli più grandi, i calcoli devono essere automatizzati.
-->
