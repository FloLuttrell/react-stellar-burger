import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {moveBurgerIngredient, removeBurgerIngredient} from "../../services/actions/currentBurgerIngredients";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './burger-constructor-item.module.css'
import PropTypes from "prop-types";

function BurgerConstructorItem({item}) {
  const dispatch = useDispatch();

  const [, dragRef, dragPreviewRef] = useDrag(() => ({
      type: "BURGER_ITEM",
      item: {itemId: item.itemId},
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

BurgerConstructorItem.propTypes = {
  item: PropTypes.object,
};

export default BurgerConstructorItem;