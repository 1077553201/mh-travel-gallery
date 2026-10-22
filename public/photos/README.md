# 成员照片放置说明

把成员照片放进这个目录，文件名与 `src/data/studio.js` 里 `members` 的 `id` 保持一致：

| 文件名 | 对应成员 |
| --- | --- |
| `muhetaer.jpg` | 木合塔尔（负责人） |
| `liangyuying.jpg` | 梁玉莹 |
| `zhengyilun.jpg` | 郑益伦 |

然后在 `src/data/studio.js` 里把该成员的 `photo` 字段填上路径：

```js
photo: '/photos/muhetaer.jpg',
```

`photo` 留空时，卡片显示该成员姓氏的大号衬线图章，不会出现破图。

建议：竖版或方形，短边 ≥ 600px，单张 ≤ 300KB（jpg 质量 85 导出即可）。
