```java {all} {maxHeight:'150px'}
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