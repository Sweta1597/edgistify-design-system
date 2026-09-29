# Third-party artwork in this library

Icons whose manifest `status` is `seed` are taken from **Material Symbols
Rounded**, part of Google's [material-design-icons](https://github.com/google/material-design-icons),
and are used under the Apache License, Version 2.0.

Copyright Google LLC. Licensed under the Apache License, Version 2.0 (the
"License"); you may not use these files except in compliance with the
License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.

The source commit is pinned as `materialRef` in `manifest.json`, so a
re-seed reproduces the same drawings. Each seed was rewritten into this
library's file format (two paths, body and accent) without altering the
path data. Seed artwork is a placeholder: as icons are redrawn to
`docs/icon-brief.md` their status becomes `drawn` and this notice stops
applying to them. Everything with status `drawn` or `approved` is
Edgistify's own work.
