// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { ConfigurationState } from 'entities/configuration';
import { ScoreState } from 'entities/score';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  score: ScoreState;
  configuration: ConfigurationState;
}
