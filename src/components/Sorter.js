export async function sortTable(mainArray, searchArray, key, toggleState) {
    let sortedMainArray = [...mainArray];
    let sortedSearchArray = [...searchArray];

    if (toggleState === 0) {
       sortedMainArray = await sortByAscending(sortedMainArray, key);
       sortedSearchArray = await sortByAscending(sortedSearchArray, key);
    }
    else if (toggleState === 1) {
        sortedMainArray = await sortByDescending(sortedMainArray, key);
        sortedSearchArray = await sortByDescending(sortedSearchArray, key);
    }

    let newToggleState = await incrementToggle(toggleState);
    
    return [sortedMainArray, sortedSearchArray, newToggleState];
}

function sortByAscending(arr, key) {
    let newArr = [...arr];
    newArr.sort(function(a, b) {
        if (a[key] < b[key])
            return -1;
        else if (a[key] > b[key])
            return 1;
        return 0; 
    });

    return newArr;
}

function sortByDescending(arr, key) {
    let newArr = [...arr];
    newArr.sort(function(a, b) {
        if (a[key] > b[key])
            return -1;
        else if (a[key] < b[key])
            return 1;
        return 0; 
    });

    return newArr;
}

function incrementToggle(toggleState) {
    return toggleState ? 0 : 1;
}