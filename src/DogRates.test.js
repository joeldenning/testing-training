import React from 'react';
import DogRates from './DogRates'
import { render, cleanup, wait, fireEvent, prettyDOM } from '@testing-library/react'
import { fetchRandomDogUrl } from './Dogs.resource'

jest.mock('./Dogs.resource.js', () => ({
  fetchRandomDogUrl: jest.fn()
}))

describe('<DogRates />', () => {

  afterEach(cleanup)

  afterEach(fetchRandomDogUrl.mockReset)

  afterEach(() => {
    localStorage.removeItem('dogs')
  })

  test('initial loading state', async () => {
    fetchRandomDogUrl.mockReturnValueOnce(Promise.resolve({message: "https://images.dog.ceo/breeds/waterdog-spanish/20180723_185559.jpg"}))
    const wrapper = render(<DogRates />)
    wrapper.getByText('Loading...')
  })

  test('shows an image, select, and button', async () => {
    fetchRandomDogUrl.mockReturnValueOnce(Promise.resolve({message: "https://images.dog.ceo/breeds/waterdog-spanish/20180723_185559.jpg"}))
    const wrapper = render(<DogRates />)
    await wait(() => {
      expect(wrapper.getByAltText('dog').src).toEqual("https://images.dog.ceo/breeds/waterdog-spanish/20180723_185559.jpg")
    })
  })

  test('lets us change our selected rating and then store our rating', async () => {
    fetchRandomDogUrl.mockReturnValue(Promise.resolve({message: "https://images.dog.ceo/breeds/waterdog-spanish/20180723_185559.jpg"}))
    const wrapper = render(<DogRates />)
    await wait(() => {
      const select = wrapper.getByLabelText('Dog rating:')
      expect(select.value).toBe("10")
      fireEvent.change(select, {
        target: {
          value: 12
        }
      })
      expect(select.value).toBe("12")
    })

    const button = wrapper.getByText('Rate dog')
    fireEvent.click(button)
    const dogs = JSON.parse(localStorage.getItem('dogs'))
    expect(dogs).toEqual([{url: "https://images.dog.ceo/breeds/waterdog-spanish/20180723_185559.jpg", rating: "12"}])
  })
})