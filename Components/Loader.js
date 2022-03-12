import { Spinner , Container , Flex } from '@chakra-ui/react'

function Loader() {
  return (
    <Container maxWidth={"container.lg"} marginRight={"14"}>
        <Flex justify={"center"} alignItems={"center"}>
        <Spinner size='xl' />
        </Flex>
    </Container>
  )
}

export default Loader