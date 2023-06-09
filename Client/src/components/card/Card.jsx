import css from "./Card.module.css"
import { NavLink } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";


function Card({ id, name, species, status, gender,origin, image, onClose, addFav, removeFav, myFavorites }) {
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false)
         removeFav(id)
      } else {
         setIsFav(true)
         addFav({ id, name, species, status, gender,origin, image })
      }
   };

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={css.contenedor}>
         {  isFav ? (<h2 className={css.enFavs}>En favoritos</h2>)
                  : (<button className={css.botonCerrar} onClick={() => onClose(id)}>X</button>)
         }
         <NavLink className={css.datos} to={`/detail/${id}`}>
            <h2 className={css.nombre} >{name}</h2>
         </NavLink>
         <h2 className={css.datos}>Estado: {status}</h2>
         <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
         <img className={css.imagenes} src={image} alt='' />
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: ({ id, name, species, status, gender,origin, image }) => dispatch(addFav({ id, name, species, status, gender,origin, image })),
      removeFav: (id) => dispatch(removeFav(id))
   }
};
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);
