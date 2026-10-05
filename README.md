# Burton Workspaces F-Droid repository

Hosted catalog for [Droidify](https://github.com/Droid-ify/client), the official F-Droid client, and [Burton App Hub](https://github.com/Burton-Workspaces/burton-app-hub). GitHub name: [Burton-Workspaces/burton-app-dist](https://github.com/Burton-Workspaces/burton-app-dist). Local checkout: `rabun-app-dist`.

This repository is **GitHub Pages only**. It must not contain `config.yml`, `keystore.jks`, or the app signing key. Those stay on the machine that runs `fdroid init` / `./scripts/publish-fdroid-pages.sh`.

## Add in Droidify or F-Droid

- **Address:** https://burton-workspaces.github.io/burton-app-dist/fdroid/repo
- **Fingerprint:** see [FINGERPRINT](FINGERPRINT) (filled in on the first publish)

Or open:

```
https://burton-workspaces.github.io/burton-app-dist/fdroid/repo?fingerprint=<contents of FINGERPRINT>
```

APKs also remain on GitHub Releases of each app repo.

## Maintainers

From a checkout of any Burton Android app sitting next to this clone:

```bash
export FDROID_ROOT=~/fdroid
./scripts/publish-fdroid-pages.sh 1.3.0
```

`FDROID_PAGES_DIR` defaults to `../rabun-app-dist`. Setup and key handling: [docs/fdroid.md](https://github.com/Burton-Workspaces/burton-app-hub/blob/master/docs/fdroid.md).
