import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, favGenre }) => {
  //const [favGenre, setFavGenre] = useState(null)
  //const myinfo = useQuery(MYINFO)

  //const fav = myinfo.data ? (myinfo.data.me ? myinfo.data.me.favoriteGenre : null) : null
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favGenre },
  });


  /*  
    useEffect(() => {
      if ( myinfo.data ) {
        if ( myinfo.data.me) {
          setFavGenre(myinfo.data.me.favoriteGenre)
        }
      }
    }, [myinfo.data])
  
    if (myinfo.data) {
      //console.log(data.me.favoriteGenre)
    }
  */
  if (!show) {
    return null
  }


  return (
    <>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favGenre}</p>
      {result.data ? result.data.allBooks.map(b => <p key={b.title}>{b.title}</p>) : null}
    </>

  )
}

export default Recommend
