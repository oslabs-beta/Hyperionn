import React from 'react';
import {render, screen, cleanup } from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
import OfflinePartitions from '../Components/OfflinePartitions';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import "@testing-library/jest-dom";

const props = {offlinePartitions : 1}

describe ('offline Partitions', () => {
  afterEach(cleanup)
  test('it renders', async () => {
    render(
      <OfflinePartitions/>,  
      )
      expect(await screen.getByRole('title')).toHaveTextContent('Offline Partitions');
      //expect(await screen.findByRole('readMoreIcon')).toBeInTheDocument();
      //expect(await screen.findByRole('number')).toBe(1)
      //screen.debug()
  })
})