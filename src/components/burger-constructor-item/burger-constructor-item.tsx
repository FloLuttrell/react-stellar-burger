import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import styles from './burger-constructor-item.module.css'
import {useAppDispatch} from "../../hooks";
import {
  IngredientSelected,
  moveBurgerIngredient,
  removeBurgerIngredient
} from "../../services/reducers/currentBurgerIngredients";


type BurgerDragItem = {
  itemId: string
}

type BurgerConstructorItemProps = {
  item: IngredientSelected
}
export const BurgerConstructorItem: React.FunctionComponent<BurgerConstructorItemProps> = ({item}) => {
  const dispatch = useAppDispatch();

  const [, dragRef, dragPreviewRef] = useDrag(() => ({
      type: "BURGER_ITEM",
      item: (): BurgerDragItem => ({itemId: item.itemId}),
    }),
    []
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: "BURGER_ITEM",
      drop: (dropItem: BurgerDragItem) => {
        dispatch(moveBurgerIngredient({srcItemId: dropItem.itemId, targetItemId: item.itemId}));
      }
    }),
    []
  )

  return (
    <div className={`${styles.dropZone}`} ref={dropRef}>
      <i ref={dragRef}>
        <DragIcon type="primary"/>
      </i>
      <span ref={dragPreviewRef} className={styles.constructorElementWrapper}>
        <ConstructorElement
          handleClose={() => {
            dispatch(removeBurgerIngredient(item.itemId));
          }}
          isLocked={false}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
        </span>
    </div>
  );
}