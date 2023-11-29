import { Link } from "react-router-dom";
import { Box, Button, Grid, Text, Image } from "@chakra-ui/react";
import heroImg from "../assets/trallo_hero_img.webp";

function HeroSection() {
	return (
		<Grid
			templateColumns={{ sm: "1fr", md: "1fr 1fr" }}
			gap={{ sm: 4, md: 8 }}
			alignItems="center"
			background="linear-gradient(45deg, #6945AC, #DD4EB2)"
			paddingTop="54px"
			color="white"
		>
			<Box
				gridColumn={{ sm: "span 1", md: "span 1" }}
				padding={{ sm: "0", md: "0 34px 72px 72px" }}
			>
				<Text
					fontSize="48px"
					lineHeight="normal"
					fontWeight="semibold"
					marginBottom="4"
				>
					Trello brings all your tasks, teammates, and tools together
				</Text>
				<Text fontSize="lg" mb="4">
					Keep everything in the same place—even if your team isn’t.
				</Text>

				<Button
					_hover={{ bg: "gray.500", color: "white" }}
					variant="outline"
					color="white"
					borderColor="white"
					size="sm"
					as={Link}
					to="https://blog.trello.com/"
				>
					Learn More
				</Button>
			</Box>

			<Box gridColumn={{ sm: "span 1", md: "span 1" }}>
				<Image src={heroImg} alt="logo" width="100%" />
			</Box>
		</Grid>
	);
}

export default HeroSection;
