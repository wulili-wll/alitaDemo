import item from './item.json';
import summoner from './summoner.json';
import ming from './ming.json';
import herolist from './herolist.json';
export default {
  'GET /api/hello': {
    text: 'Alita',
  },
  // 'POST /api/heroType.json': (req, res) => {
  //   const { heroType } = req.body;
  //   const hero = herolist.filter(item => (item.hero_type + '') === (heroType + ''));
  //   res.send(hero);
  // },


  '/api/item.json': item,
  '/api/summoner.json': summoner,
  '/api/ming.json': ming,
  'POST /api/freeheros.json':(req,res)=>{
    const { number } = req.body;
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  }
};


