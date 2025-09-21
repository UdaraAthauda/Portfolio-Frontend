import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  Field,
  HStack,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../api";
import {
  FaLinkedin,
  FaGithub,
  FaPhoneSquareAlt,
  FaPaperPlane,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineHome, MdTouchApp } from "react-icons/md";
import { Link } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import ResumeDownload from "@/components/ui/ResumeDownload";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactDetails, setContactDetails] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get("introduction/");
      setContactDetails(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("contact/", formData);

      toaster.create({
        title: "Success",
        description: "Your message has been sent!",
        type: "success",
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "An error occurred. Please try again.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (contactDetails.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container maxW="6xl" py={7}>
          <Heading
            textAlign="center"
            mb={5}
            size={{ base: "2xl", md: "3xl" }}
            color="purple.700"
          >
            <HStack justify={"center"}>
              <MdTouchApp /> Get in Touch.
            </HStack>
          </Heading>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
            justify="center"
            align="stretch"
          >
            {/* Contact Info */}
            <Card.Root
              flex="1"
              p={{ base: 4, md: 6 }}
              shadow="md"
              borderRadius="2xl"
            >
              <Card.Body>
                <Heading size="md" mb={4}>
                  Contact Me
                </Heading>
                <Text mb={3}>
                  I’d love to hear from you! Whether it’s a project, job
                  opportunity, or just a chat.
                </Text>
                <Stack gap={4}>
                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <HStack color="teal.600">
                      <Icon as={FaEnvelope} />
                      <Text wordBreak="break-word">{contactDetails.email}</Text>
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Phone:</Text>
                    <HStack color="teal.600">
                      <Icon as={FaPhoneSquareAlt} />
                      <Text wordBreak="break-word">{contactDetails.phone}</Text>
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Location:</Text>
                    <HStack color="teal.600">
                      <Icon as={FaLocationDot} />
                      <Text wordBreak="break-word">
                        {contactDetails.location}
                      </Text>
                    </HStack>
                  </Box>
                </Stack>
                <HStack mt={5} justify="center" spacing={6} wrap="wrap">
                  <IconButton
                    as={"a"}
                    href={contactDetails?.github}
                    aria-label="GitHub"
                    variant="solid"
                    colorPalette="teal"
                  >
                    <FaGithub />
                  </IconButton>
                  <IconButton
                    as={"a"}
                    href={contactDetails?.linkedin}
                    aria-label="LinkedIn"
                    variant="solid"
                    colorPalette="teal"
                  >
                    <FaLinkedin />
                  </IconButton>
                </HStack>
              </Card.Body>
              <Stack gap={3} w="100%">
                <ResumeDownload resumeUrl={contactDetails?.resume} />
                <Button as={Link} to="/" variant="subtle" w="100%">
                  <MdOutlineHome /> Back to Home
                </Button>
              </Stack>
            </Card.Root>

            {/* Contact Form */}
            <Card.Root
              as="form"
              onSubmit={handleSubmit}
              flex="2"
              p={{ base: 4, md: 6 }}
              shadow="md"
              borderRadius="2xl"
            >
              <Card.Body>
                <Heading size="md" mb={4}>
                  Send a Message
                </Heading>
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      size="lg"
                      colorPalette="teal"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Email
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="email"
                      value={formData.email}
                      type="email"
                      onChange={handleChange}
                      placeholder="Your Email"
                      size="lg"
                      colorPalette="teal"
                      required
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Message
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      size="lg"
                      rows={5}
                      colorPalette="teal"
                      required
                    />
                  </Field.Root>

                  <Button
                    name="submit"
                    type="submit"
                    mt={3}
                    alignSelf={{ base: "stretch", md: "flex-start" }}
                    variant="solid"
                    colorPalette="teal"
                    size="lg"
                    loading={submitting}
                    loadingText="Sending..."
                  >
                    <FaPaperPlane /> Send Message
                  </Button>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Flex>
        </Container>
      )}
    </>
  );
}
