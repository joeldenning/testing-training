export function fetchRandomDogUrl(signal) {
  return fetch('https://dog.ceo/api/breeds/image/random', {signal})
    .then(r => {
      if (r.ok) {
        return r.json()
      } else {
        throw Error(`dog.ceo responded with http status ${r.status}`)
      }
    })
}