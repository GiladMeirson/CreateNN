// Your object with functions
const obj = {
    prop1: 'value1',
    func1: function() {
      console.log('Function 1');
    }
  };
  
  // Convert functions to strings
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].toString();
    }
  }
  
  // Serialize the object with functions
  const serializedObj = JSON.stringify(obj);
  
  // Later, when you want to reconstruct the object
  // Parse the JSON
  const parsedObj = JSON.parse(serializedObj);
  
  // Recreate the functions
  for (const key in parsedObj) {
    if (typeof parsedObj[key] === 'string' && parsedObj[key].startsWith('function')) {
      parsedObj[key] = new Function('return ' + parsedObj[key])();
    }
  }
  
  // Now, `parsedObj` will have the functions intact
  console.log(parsedObj)
  