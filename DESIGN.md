# DESIGN.md — kommons

> このファイルはkommonsのUIを作るときの基準。
> コードを書く前に必ず参照すること。

---

## 1. Color Palette

```
Background:   #FFFFFF
Text primary: #1C1C1A
Text muted:   #888884
Border:       #E8E6E1
```

- アクセントカラーは使わない
- グラデーションは使わない
- 純粋な黒（#000）・純粋な白（#FFF flat use）は避ける
- サロンらしい色（ピンク、ゴールド、パープル等）は禁止

---

## 2. Typography

> ⚠️ ロゴ確定後（小林イッキ）に全体バランスを要調整。現時点の方向性。

**English / Latin**
- Font: DM Sans
- Body: weight 300
- Headline: weight 600
- Letter-spacing: headline に −0.02〜−0.03em

**Japanese**
- Font: Zen Kaku Gothic New
- EN/JPは翻訳関係ではなく、それぞれ独立したコピーとして書く

**禁止フォント**
- Inter, Roboto, Arial, Noto Sans（指定なき場合）

---

## 3. Components & Layout

- 角丸: 原則なし、または 2px 以下（sharp）
- ボタン: テキストリンク or アウトラインのみ、塗りボタンは最小限
- カード: 薄いborder（#E8E6E1）、shadow は使わない
- ポップアップ・バナー: 禁止
- 余白: 広め。詰め込まない

---

## 4. Copy Rules

- 「最高」「プロの技術」「こだわり」「是非お任せください」は使わない
- 断言より問いかけを優先する
- 一人称で具体的な技術・体験を語る（lecture styleにしない）
- EN/JPはそれぞれ独立して書く（翻訳しない）

---

## 5. Photography & Visual Tone

- トーン: VSCO A4〜A6 相当（フィルムライク、ウォーム寄り）
- 過度な加工・美肌補正は避ける
- 空間・テクスチャ・断片的な構図を重視する

---

## 6. References

- goyemon.tokyo
- innthe-people.com

これらのサイトの「余白の使い方」「コピーのトーン」「写真の文脈」を参考にする。
UIパーツを真似るのではなく、空気感を参照する。

---

## 7. Brand Axis

- サロン名: kommons（常に小文字）
- コンセプト: 予期せぬ出会い、その人の断片を拾う
- ターゲット: 高円寺在住の英語圏外国人
- 禁止ワード: "best" "top" "luxury" "premium" "高品質" "最先端"
