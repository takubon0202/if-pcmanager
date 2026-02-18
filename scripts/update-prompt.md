# ノートPCデータベース更新タスク

あなたはPC Managerアプリのノートパソコンデータベースを更新するエージェントです。

## 目的
`src/data/laptops.ts` のノートPC情報を最新の日本市場データに更新する。

## 更新対象

### 1. Apple認定整備済製品（最重要・毎日変動）
- https://www.apple.com/jp/shop/refurbished/mac/macbook-air
- https://www.apple.com/jp/shop/refurbished/mac/macbook-pro
- 最安価格と主要構成の価格を更新
- 在庫がない構成は残すが、コメントで「在庫なし」と注記

### 2. 主要メーカー価格チェック
以下のブランドの現行モデルの価格変動を確認:
- Lenovo (IdeaPad, ThinkPad, Yoga, LOQ, Legion)
- HP (OmniBook, Victus)
- Dell (Inspiron, XPS)
- ASUS (Vivobook, Zenbook, TUF, ROG, ProArt)
- Apple (MacBook Air, MacBook Pro 新品)
- その他 (mouse, Dynabook, Panasonic, 富士通, NEC, MSI, Microsoft)

### 3. 新製品チェック
- 過去1週間に日本で発売・発表された新しいノートPCがあれば追加
- 検索クエリ例: 「ノートパソコン 新製品 発売 日本 2026」

## データ形式

各エントリは以下の形式:
```typescript
{
  name: "製品名",
  brand: "ブランド名",
  price: 価格（税込、数値のみ）,
  url: "製品ページURL",
  modelNumber: "型番",
  specs: {
    cpu: "CPU名",
    memory: "メモリ容量",
    storage: "ストレージ",
    display: '画面サイズ・解像度',
    gpu: "GPU名",
    battery: "バッテリー駆動時間",
    weight: "重量"
  },
  matchScore: 0,
  reasons: [],
}
```

## ルール
1. 価格は必ず税込で記載
2. 日本市場で購入可能なモデルのみ
3. 販売終了モデルは削除（後継機に置き換え）
4. 価格帯のバランスを維持（バジェット/ミドル/ハイエンド各帯に十分なモデル）
5. 認定整備済製品は名前に「[認定整備済製品]」を付ける
6. 更新日のコメントをファイル先頭に記載
7. TypeScriptとしてビルドが通ること

## 更新対象ファイル
1. `src/data/laptops.ts` — ノートPC推薦データベース
2. `src/data/model-catalog.ts` — PC診断用の型番カタログ（メーカー別モデル一覧）

model-catalog.ts には各メーカーの現行モデル＋過去2-3年のモデルを含めてください。
新モデルが発売されたら追加し、5年以上前のモデルは削除してください。

## 出力
更新後のファイルを直接編集してください。
変更があった場合はgit commit & pushしてください。
コミットメッセージ: "chore: ノートPCデータベース定期更新 (YYYY-MM-DD)"
