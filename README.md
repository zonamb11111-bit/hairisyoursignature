# hairisyoursignature.jp — Landing Page

HIKARU TERADA / kommons の公式LP。**Cloudflare Pages** + GitHub 連携で `https://www.hairisyoursignature.jp` 配下にホスティング。

---

## ディレクトリ構成

```
.
├── index.html              ← LP本体(EN/JP両言語、JSが自動言語検出)
├── koenji-guide.html       ← /koenji-guide.html (高円寺ガイド、Mapbox)
├── llms.txt                ← LLM crawler 向けサマリ
├── robots.txt              ← クローラ許可設定
├── sitemap.xml             ← 検索エンジン向けインデックス
├── _redirects              ← Cloudflare Pages 301リダイレクトルール (旧Wix URL → 新URL)
├── _headers                ← Cloudflare Pages キャッシュ・セキュリティヘッダ
├── DESIGN.md               ← デザイントークン(色・フォント・余白)
├── HANDOFF.md              ← 元のデザインハンドオフ仕様書
├── README.md               ← このファイル
├── LAUNCH.md               ← 移行手順とロールバック
│
└── assets/                 ← 画像・動画
    ├── hero.mp4
    ├── HAIR_ICONS_STICKER.mp4
    ├── hikaru.png / salon-interior.jpg / keraffect.png / hairis-logo.png
    └── (Style Archive 動画 10本: soft-wolf-cut.mp4 ほか)
```

---

## ホスティングアーキテクチャ

```
お名前.com (ドメイン管理)
    ↓ name servers
Cloudflare (DNS + CDN + SSL + リダイレクト)
    ↓ Cloudflare Pages
GitHub repo (zonamb11111-bit/hairisyoursignature)
```

---

## デプロイ手順(Cloudflare Pages 新規セットアップ)

詳細は [LAUNCH.md](./LAUNCH.md) 参照。要約:

1. GitHub に新リポジトリ作成 → このフォルダの中身を push
2. Cloudflare アカウント作成 → Pages → GitHub repo 連携 → ビルド設定なし(静的)
3. お名前.com で name server を Cloudflare の値に変更
4. Cloudflare 側で custom domain `www.hairisyoursignature.jp` 設定
5. DNS反映 → 自動でSSL発行 → 完了

---

## ローカル編集・更新フロー

### 編集の中心
| 編集したい内容 | ファイル | 場所 |
|---|---|---|
| 営業時間・住所・料金 | `index.html` | `<script type="application/ld+json">` (Schema.org) と該当HTML2箇所(EN/JP) |
| FAQ | `index.html` | `id="faq"` セクション + `<script type="application/ld+json">` (FAQPage) ×2(EN+JP) |
| メニュー価格 | `index.html` | `id="service"` セクション (EN/JP別)+ Schema OfferCatalog |
| Style Archive 動画差し替え | `assets/` に `<kebab-name>.mp4` を配置 + `index.html` の data-src 更新 |
| LP コピー文 | `index.html` 内、`lang-en` / `lang-jp` クラスの要素を直接編集 |
| 高円寺ガイド店舗 | `koenji-guide.html` の `const stores = [...]` 配列 |
| Mapbox トークン | `koenji-guide.html` の `mapboxgl.accessToken` |
| 301リダイレクト追加・変更 | `_redirects` ファイル(Cloudflare Pages が自動適用) |
| キャッシュ設定 | `_headers` ファイル |

### 更新フロー
```bash
# 1) ローカルで編集
# 2) コミット & push
git add .
git commit -m "Update menu prices"
git push

# Cloudflare Pages が自動で再ビルド・再デプロイ(数十秒)
```

### ローカルプレビュー
```bash
cd /path/to/this/folder
python3 -m http.server 8000
# http://localhost:8000/ で確認
# ※ _redirects は Cloudflare 上でしか動かない。ローカルでは旧URL → 新URL の動作未確認になる
```

---

## 重要な外部依存

| 用途 | URL / ID | 管理場所 |
|---|---|---|
| Booking form (本予約) | `https://zonamb11111-bit.github.io/kommons-booking/` | GitHub Pages 別リポジトリ |
| Mood Curator | `https://find.hairisyoursignature.jp/` | 別ホスティング |
| LINE bot | `https://lin.ee/OjJQtyi` | LINE公式アカウント |
| Mapbox token | `pk.eyJ1Ijoiem9uYW1iIi...` (`koenji-guide.html`内) | https://account.mapbox.com — **URL allowlist必須** |
| Google fonts | DM Sans, Zen Kaku Gothic New, DM Mono | CDN直リンク |

---

## SEO/AIO チェックリスト(更新時)

メニュー・営業時間・FAQ を変更したら、**以下5箇所すべて**を同期更新する必要あり:
1. HTML本文 (EN/JP の lang-en / lang-jp 要素)
2. JSON-LD: `LocalBusiness` の `openingHoursSpecification` / `hasOfferCatalog`
3. JSON-LD: `FAQPage` (EN) と `FAQPage` (JP) の該当 Question
4. AIO 隠し要約ブロック (`<section aria-label="At a glance">` 内)
5. `llms.txt` の該当箇所

ズレるとGoogle Knowledge Panelに矛盾が出る。

---

## Cloudflare Pages の特徴

- **無料プラン**: 帯域無制限、500ビルド/月、500プロジェクト
- **自動SSL**: Let's Encrypt または独自証明書
- **CDN**: 300+ エッジロケーションでグローバル配信
- **プレビューデプロイ**: PRごとに `<branch>--<project>.pages.dev` で確認可
- **ロールバック**: ダッシュボードから過去デプロイに即戻せる
- **ビルド不要**: 静的HTMLそのまま公開
- **`_redirects` / `_headers`**: ルート直下のファイルで301・ヘッダ管理

---

## 既知の制約

- LP は単一HTML(SSR/i18nルーティングなし)。画面分割するときは Next.js 等への移行を検討
- `noscript` 環境では言語切替できない(JP DOMがdisplay:noneのまま)
- `_redirects` のフラグメント(`#section`)は仕様上ブラウザに到達後に解釈される
