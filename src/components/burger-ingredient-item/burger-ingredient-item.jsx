import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {moveBurgerIngredient, removeBurgerIngredient} from "../../services/actions/currentBurgerIngredients";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './burger-ingredient-item.module.css'

function BurgerIngredientItem({item}) {
  const dispatch = useDispatch();

  const [{opacity}, dragRef, dragPreviewRef] = useDrag(() => ({
      type: "BURGER_ITEM",
      item: {itemId: item.itemId},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: "BURGER_ITEM",
      drop: (di) => {
        dispatch(moveBurgerIngredient(di.itemId, item.itemId));
      }
    }),
    []
  )
  return (
    <div className={`${styles.dropZone}`} ref={dropRef} >
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

export default BurgerIngredientItem;