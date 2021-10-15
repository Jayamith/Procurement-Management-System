import { first, filter, orderBy } from 'lodash';

export function searchFilter(array, query, attribute) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    if (query) {
        array = filter(array, (_question) => {
            return (
                _question[attribute].indexOf(query) !== -1
            );
        });
        return array;
    }
    return stabilizedThis.map((el) => el[0]);
}