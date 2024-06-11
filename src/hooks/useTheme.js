import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function useTheme (){
    let contexts = useContext(ThemeContext);
    if(contexts === undefined){
        new Error('This is undefined because it outside ThemeContextProvider.');
    }
    return contexts;
}