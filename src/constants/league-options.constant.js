import { sortByUtil } from '../utils/sort-by.util';

const LEAGUE_OPTIONS = sortByUtil([
  {
    name: 'Premier League',
    value: 'premier',
    image: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&w=80&h=80&transparent=true'
  },
  {
    name: 'La Liga',
    value: 'laliga',
    image: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&w=80&h=80&transparent=true'
  },
  {
    name: 'Bundesliga',
    value: 'bundesliga',
    image: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=80&h=80&transparent=true'
  },
  {
    name: 'Serie A',
    value: 'seriea',
    image: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=80&h=80&transparent=true'
  },
  {
    name: 'Ligue 1',
    value: 'ligue1',
    image: 'https://i.imgur.com/aj7FnmI.png'
  },
  {
    name: 'Champions League',
    value: 'champions',
    image: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png&w=80&h=80&transparent=true'
  }
], 'name');

export default LEAGUE_OPTIONS;