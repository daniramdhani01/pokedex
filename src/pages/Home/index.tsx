import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import MyPokemon from '../../components/MyPokemon'
import { ApiGet } from '../../utils/API'

function Home() {
  // const data = ApiGet({fetchOnMounted:true, url:'pokemon', params:{}}).data
  // console.log('dani',data)
    const navigate = useNavigate()
  return (
    <div className='pt-3'>
       <TwitterTimelineEmbed
          sourceType="profile"
          screenName="Pokemon"
          options={{height: 400}}
        />
      <MyPokemon/>
    </div>
  )
}

export default Home