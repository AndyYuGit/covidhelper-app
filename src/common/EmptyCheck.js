export function emptyCheck( obj ){
    if( (typeof obj === 'number' && obj > 0) || obj === true ){
        return false;
    }
    return !!obj
        ? !Object.keys( obj ).length
        : true;
}