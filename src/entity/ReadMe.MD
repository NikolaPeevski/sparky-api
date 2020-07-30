# Entities

The Sparky structure for entities is opinionated. The main three type of entities are Application, Auth and Abstract.

```
├── AbstractEntities
│   ├── DateAbstract.entity.ts
│   └── DateExpiresAbstract.entity.ts
├── ApplicationEntities
│   └── User.entity.ts
├── AuthEntities
│   ├── oAuthAccessTokens.entity.ts
│   ├── oAuthAuthCodes.entity.ts
│   ├── oAuthClients.entity.ts
│   ├── oAuthPersonalAccessClients.entity.ts
│   └── oAuthRefreshTokens.entity.ts
└── ReadMe.MD
```

## Abstract entities

Technically not entities but rather extendible abstract classes these entities contain repeatable fields such as CreatedAt that one would need to use application wide. The can be dependent on each other. The rule of thumb is that as long as the base abstract class extends the Base class everything should be good.

## Application entities

These entities are application wide and may only interact between each other through the means of relationships and joined columns.

## Auth entities

These entities are responsible for the authentification flow. Keeping track of tokens, refresh tokens and secrets.