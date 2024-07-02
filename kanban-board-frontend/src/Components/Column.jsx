import { useDrop } from 'react-dnd';
import { Box, Heading } from '@chakra-ui/react';
import CardComponent from './CardComponent';

const Column = ({ status, title, items, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => onDrop(item, status),
  });

  return (
    <Box width="60%">
      <Box>
        <Heading bgColor={title.bgColor} p={3} borderRadius="lg">
          {title.text}
        </Heading>
      </Box>
      <Box ref={drop} p={2} bg="gray.100" minHeight="80vh">
        {items?.map((e) => (
          <CardComponent key={e._id} item={e} type="CARD" />
        ))}
      </Box>
    </Box>
  );
};

export default Column;
