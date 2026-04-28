# Wix → Cloudflare Pages 移行プラン

`https://www.hairisyoursignature.jp` の運用を Wix から Cloudflare Pages(+ GitHub)へ切り替える手順。  
**所要時間**: 実作業 40〜70分 + DNS反映待ち最大24時間

---

## アーキテクチャ

```
お名前.com  → name servers指定  → Cloudflare DNS
                                       ↓
                                  Cloudflare Pages (CDN + SSL)
                                       ↓ pull
                                  GitHub repo
                                       ↑ push
                                       └ ローカル開発
```

ドメイン本体は **お名前.comに残す**。Cloudflareには**name server だけ委譲**(無料)。

---

## 推奨タイミング

- **曜日**: 平日 月〜水
- **時間帯**: 平日10:00〜14:00(JST)
- **避ける**: 月末・週末・予約集中日・SNS投稿の前後3日
- **手元**: 移行中のお問合せ用にLINE/Instagramを開いておく

---

## Phase 0: 移行前チェック(ライブ影響なし)

リハーサル段階。Wixはまだ稼働中。

- [ ] **被リンクの確認** — Google Search Console「リンク」レポートで外部からどのURLにリンクが張られているか確認
- [ ] **GitHub アカウント** `zonamb11111-bit` でログインできる
- [ ] **Cloudflare アカウント作成**(まだなら) — https://dash.cloudflare.com/sign-up (無料、2分)
- [ ] **お名前.com Navi** ログインできる
  - 「ドメインNavi」→ 該当ドメイン → ネームサーバー情報の**スクリーンショット保存**(ロールバック用)
  - 既存のDNS設定もスクリーンショット
- [ ] **Mood Curator サブドメイン** (`find.hairisyoursignature.jp`) のCNAME値を控える(後で再設定するため)
- [ ] **Wix 管理画面**: 解約はまだしない、設定確認のみ
- [ ] **PCに `git` コマンド**:
  ```bash
  git --version
  ```

---

## Phase 1: GitHub リポジトリ作成 & push(ライブ影響なし)

### 1-1. GitHub UI で新リポジトリ作成
- https://github.com/new
- リポジトリ名: `hairisyoursignature`
- Public(Privateでも可、Cloudflare Pages はどちらも対応)
- README 等は追加しない(空のまま)

### 1-2. ローカルから push

```bash
cd /Users/hattorihikari/Downloads/kommons-agents/booking-system/lp

# 初回のみ git ユーザー設定(必要なら)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

git init
git add .
git commit -m "Initial deploy of hairisyoursignature.jp LP"
git branch -M main
git remote add origin https://github.com/zonamb11111-bit/hairisyoursignature.git
git push -u origin main
```

push時に GitHub のユーザ名・パスワード(またはアクセストークン)を求められる。  
パスワード認証は廃止されているので、**Personal Access Token**を使う:
- https://github.com/settings/tokens/new で生成
- スコープ: `repo` だけチェック
- 生成されたトークンをパスワード欄にペースト

---

## Phase 2: Cloudflare Pages 接続(ライブ影響なし)

### 2-1. Cloudflare Pages プロジェクト作成
1. https://dash.cloudflare.com → 左サイドバー **Workers & Pages**
2. **Create application** → **Pages** タブ → **Connect to Git**
3. GitHub アカウント連携(初回のみ)
4. リポジトリ `zonamb11111-bit/hairisyoursignature` を選択 → **Begin setup**
5. ビルド設定:
   - Project name: `hairisyoursignature`(任意)
   - Production branch: `main`
   - **Build command**: 空欄(ビルド不要)
   - **Build output directory**: `/`(ルート)
6. **Save and Deploy**
7. 1-2分でデプロイ完了 → `<project>.pages.dev` URL が発行される

### 2-2. プレビューURLで動作確認
発行された `https://hairisyoursignature.pages.dev/`(または類似URL)で:

- [ ] LP本体が表示される
- [ ] 動画10本が再生される(Style Archiveをスクロール)
- [ ] 言語切替(EN/JP)動く
- [ ] 予約ボタンが `kommons-booking` GitHub Pages に飛ぶ
- [ ] FAQ アコーディオン展開
- [ ] レビューパネル展開
- [ ] OSM地図表示(Access)
- [ ] `/koenji-guide.html` 表示 + Mapbox動作
- [ ] `/llms.txt` ダウンロードできる
- [ ] `/booking` → kommons-booking に **301リダイレクト**(curl で確認可)
  ```bash
  curl -I https://hairisyoursignature.pages.dev/booking
  # → HTTP/2 301
  # → location: https://zonamb11111-bit.github.io/kommons-booking/
  ```

問題あれば修正 → push → 自動再デプロイ(40秒程度)。

---

## Phase 3: ドメイン委譲 + Cloudflare で DNS 管理(本番ドメインに繋ぐ)

**ここから既存サイトに影響開始。**

### 3-1. Cloudflare にドメイン追加
1. Cloudflare ダッシュボード → **Add a site**
2. `hairisyoursignature.jp` を入力 → **Continue**
3. プラン: **Free** を選択 → **Continue**
4. Cloudflare が現在のWix DNS設定を自動取得
5. **重要**: 表示された既存レコードのうち、**Wix関連のAレコード/CNAMEは削除** または **無視**(後でPagesに置き換える)
   - `find.hairisyoursignature.jp` のCNAME(Mood Curator) はそのまま残す
6. **Continue**

### 3-2. お名前.comのname serverを変更
Cloudflare が指定する2つのname server(例:`xxx.ns.cloudflare.com`, `yyy.ns.cloudflare.com`)を控える。

1. お名前.com Navi → ドメインNavi → 該当ドメイン → **ネームサーバーの変更**
2. **その他のネームサーバーを使う** を選択
3. プライマリに `xxx.ns.cloudflare.com`、セカンダリに `yyy.ns.cloudflare.com` を入力
4. 確認 → 確定

### 3-3. DNS反映待ち(5分〜24時間、通常30分以内)
```bash
# 確認コマンド
dig +short ns hairisyoursignature.jp
# → cloudflareの2つのns が表示されればOK
```

または https://www.whatsmydns.net で確認。

Cloudflareダッシュボードに **"Active"** バッジが付けば完了。

### 3-4. Cloudflare Pages にカスタムドメイン設定
1. Workers & Pages → 該当 Pages プロジェクト → **Custom domains** タブ
2. **Set up a custom domain** → `www.hairisyoursignature.jp` → 続行
3. CloudflareがDNSレコード(CNAME)を自動追加
4. **もう1個追加**: apex `hairisyoursignature.jp`(同じプロジェクトに)
5. SSL証明書が自動発行(数分〜15分)

### 3-5. Cloudflare DNS で apex → www の301を設定
1. Cloudflare ダッシュボード → **DNS** タブ
2. apex `hairisyoursignature.jp` を選択 → **Edit**(既にPages用CNAMEが入っているはず)
3. 別アプローチ: **Rules** → **Redirect Rules** → **Create rule**
   - URL Path equals `/` and Hostname equals `hairisyoursignature.jp`
   - → Static redirect to `https://www.hairisyoursignature.jp/$1`(301)
4. 保存

### 3-6. find.hairisyoursignature.jp の再設定
- Cloudflare DNS タブで CNAME `find` を追加
- 値: Phase 0で控えたMood CuratorのCNAME先

---

## Phase 4: 切替後検証

DNSが反映されて `https://www.hairisyoursignature.jp/` で新LPが表示されたら:

- [ ] `https://www.hairisyoursignature.jp/` → 新LP表示 ✓
- [ ] `https://hairisyoursignature.jp/` → www に301
- [ ] `http://www.hairisyoursignature.jp/` → https に301
- [ ] `https://find.hairisyoursignature.jp/` → Mood Curator表示

リダイレクト動作確認:
```bash
for path in /booking /book-online /moodcurator /faq /llms-txt /ja /ja/booking /ja/faq; do
  echo "=== $path ==="
  curl -sI "https://www.hairisyoursignature.jp${path}" | grep -iE "^(http|location)"
done
```

すべて `301` + 正しい location を返せばOK。

その他:
- [ ] `/koenji-guide.html` → Mapbox動作 + tokenのURL allowlist 設定済 (https://account.mapbox.com/access-tokens/)
- [ ] `/sitemap.xml` 表示
- [ ] `/robots.txt` 表示
- [ ] `/llms.txt` 表示
- [ ] **Google Search Console**: `https://www.hairisyoursignature.jp/sitemap.xml` を再送信
- [ ] **Search Console**: 旧URL(`/booking`)を URLインスペクションで301認識を確認
- [ ] DNS変更日からの5〜10日間、エラーが急増しないか「カバレッジ」レポートを毎日チェック

---

## Phase 5: Wix 解約

**DNS切替から最低7日間 様子見してから解約。**

確認項目:
- [ ] Search Console でクロールエラーなし
- [ ] Google マップでビジネスプロフィール URL が `www.hairisyoursignature.jp` で正しく表示
- [ ] 主要キーワードで順位が大きく落ちていない
- [ ] アナリティクスで自然流入が継続している

問題なければ Wix 管理画面から解約。

---

## ロールバック手順

### Phase 1〜2(GitHub/Cloudflare Pages のみ)で問題発生
- 修正コミット → push → 自動再デプロイ
- 致命的なら Cloudflare Pages → Deployments → 旧バージョンを **Rollback**(1クリックで前バージョンに戻る)
- まだお名前.com の name server は触っていないので Wix は無傷

### Phase 3(name server切替後)で問題発生
- お名前.com Navi → ネームサーバー変更で **元のWix用name serverに戻す**
- 反映まで5分〜数時間
- Phase 0で控えたWix DNS情報を見ながら戻す
- Wixは解約していないので自動復旧

### Phase 4(検証)で SSL/DNS 問題
- Cloudflare ダッシュボードで Pages の Custom Domain 設定を再確認
- 24時間待ってもダメなら、カスタムドメインを一度削除 → 再追加
- それでもダメなら Cloudflare サポートに問い合わせ(無料プランも対応)

### Phase 5(Wix解約)後に問題発覚
- Wixは復旧不可
- Cloudflare Pages は安定運用中なので、別の問題(Mapboxトークン期限切れ等)を疑う
- 緊急時は Cloudflare ダッシュボードで全機能管理可

---

## 参考URL

- Cloudflare Pages 公式: https://developers.cloudflare.com/pages/
- Cloudflare Pages `_redirects`: https://developers.cloudflare.com/pages/configuration/redirects/
- お名前.com ネームサーバー変更: https://help.onamae.com/answer/8210
- Mapbox URL allowlist: https://account.mapbox.com/access-tokens/
- 障害時の問い合わせ:
  - Cloudflare: https://dash.cloudflare.com/?to=/:account/support
  - お名前.com: 0570-064-064
