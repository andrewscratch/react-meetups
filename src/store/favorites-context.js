import { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) => { },
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {} 
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])

     useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setUserFavorites(JSON.parse(storedFavorites));
        }
    }, []);

   
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(userFavorites));
    }, [userFavorites]);
    

    function addFavoriteHandler(favoriteMeetup) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteMeetup);
        });
}
    function removeFavoriteHandler(meetupId) {
        setUserFavorites(prevUserFavorites => {
            return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
        });
     }
    
    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId);
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };


    return ( <FavoritesContext.Provider value={context}>
{props.children}
    </FavoritesContext.Provider>
    )
}

export default FavoritesContext;