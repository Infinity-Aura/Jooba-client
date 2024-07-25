import { attach, createDomain, sample } from 'effector';

import { OneGoods, goodsModel } from 'entities/goods';

const domain = createDomain('features/goods/create-bulk');

export const dialogOpenRequested = domain.event<boolean>();
export const createGoodsRequested = domain.event<Partial<OneGoods>[]>();

const createGoodsFx = attach({ effect: goodsModel.createGoodsFx });

export const $dialogOpen = domain.createStore<boolean>(false);

$dialogOpen.on(dialogOpenRequested, (_, dialogOpen) => dialogOpen).reset([createGoodsRequested]);

sample({
  clock: createGoodsRequested,
  fn: (goods) =>
    goods.map((good) => ({
      name: good.name,
      article: good.article,
      brand: good.brand,
      category: good.category,
      subcategory: good.subcategory,
      colour: good.colour,
      size: good.size,
      description: good.description,
      quantity: good.quantity,
      price: good.price,
      sale: good.sale,
    })),
  target: createGoodsFx,
});
