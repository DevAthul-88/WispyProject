import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { BsPerson  } from 'react-icons/bs';
  import {  FiFile } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';
  import {TiTicket} from 'react-icons/Ti'
  
  const StatsCardProps  = {
    title: String,
    stat: String,
    icon: "",
  }
  function StatsCard(props = StatsCardProps) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function BasicStatistics({p , e , t}) {
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} marginBottom="5">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Users'}
            stat={e}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Projects'}
            stat={p}
            icon={<FiFile size={'3em'} />}
          />
          <StatsCard
            title={'Tickets'}
            stat={t}
            icon={<TiTicket size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }