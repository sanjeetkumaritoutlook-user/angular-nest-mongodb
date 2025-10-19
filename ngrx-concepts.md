## architecture
```
src/
└── app/
    └── products/
        ├── components/
        │   └── products.component.ts
        │   └── products.component.html
        │   └── products.component.scss  (optional styling)
        │
        ├── models/
        │   └── product.model.ts
        │
        ├── services/
        │   └── products.service.ts
        │
        ├── store/
        │   ├── products.actions.ts
        │   ├── products.reducer.ts
        │   ├── products.selectors.ts
        │   ├── products.effects.ts
        │   └── products.facade.ts
        │
        ├── products.module.ts
        └── products-routing.module.ts  (if lazy-loaded via router)

```
## Step 1: Install NgRx packages (state management)

```
ng add @ngrx/store@latest
ng add @ngrx/effects@latest
ng add @ngrx/store-devtools@latest
ng add @ngrx/entity@latest
```

in v17
```
ng add @ngrx/store@17
ng add @ngrx/effects@17
ng add @ngrx/store-devtools@17
ng add @ngrx/entity@17
```

create feature module
```
ng generate module products --route products --module app.module
```

## NgRx builds a state tree like:
```
{
  products: {
    ids: [],
    entities: {},
    loading: false,
    error: null
  }
}
```
Double-check imports are correct and no circular dependencies exist.