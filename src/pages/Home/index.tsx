import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import MyPokemon from '../../components/MyPokemon'

function Home() {
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