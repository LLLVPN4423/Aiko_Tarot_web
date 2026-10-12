# Bé Tabby Tarot (Pet Tarot)

Website xem tarot **22 lá Major Arcana**, song ngữ **Việt / English**, phong cách hoạt hình ấm áp — lấy cảm hứng từ mèo tabby nhà bạn.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Đổi tên bé

Sửa file `src/config/pet.ts`:

```ts
export const petConfig = {
  name: "Tên bé của bạn",
  // ...
};
```

## Bộ bài & hình ảnh

- **3 lá có minh họa mẫu** (AI, tham chiếu ảnh pet): Kẻ Khờ (0), Pháp Sư (1), Mặt Trời (19) — trong `public/cards/`.
- **19 lá còn lại**: khung placeholder (ảnh mặt bé + tên lá) — thêm file `public/cards/XX-slug.jpg` và `imagePath` trong `src/data/major-arcana.ts`.
- Ảnh thật của bé: `public/pet/`.

## Tính năng

- Trải **1 / 3 / 5 lá**, chủ đề (tổng quát, tình cảm, công việc, bản thân)
- Lá **thuận / ngược**, giải nghĩa VI + EN
- Xào bài, lật bài (animation)
- **Nhật ký** lưu trên trình duyệt (localStorage)

## Giai đoạn tiếp theo (78 lá)

Nhân bản cấu trúc `major-arcana.ts` cho Minor Arcana (Wands, Cups, Swords, Pentacles) khi đã có đủ art.
