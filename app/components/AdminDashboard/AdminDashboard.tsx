import React from "react";
import {
  Paper,
  Title,
  Table,
  Text,
  Stack,
  SimpleGrid,
  Card,
  Group,
  TextInput,
  Pagination,
  Badge,
  TableScrollContainer,
  Skeleton,
  Space,
} from "@mantine/core";
import { IconSearch, IconUser, IconCalendarEvent } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { GetUserDto } from "../../Apis/types/userDtos/userDtos";
import { ConsultationStatus } from "../../Apis/enums/ConsultationStatus";
import { GetConsultationForAdminDto } from "../../Apis/types/consultationDtos/consultationDtos";

type AdminDashboardProps = {
  users: GetUserDto[];
  consultations: GetConsultationForAdminDto[];
  loading?: boolean;
};

function AdminDashboard({
  users = [],
  consultations = [],
  loading = false,
}: AdminDashboardProps) {
  const { t } = useTranslation("adminDashboard");
  const [searchUser, setSearchUser] = React.useState("");
  const [searchAppointment, setSearchAppointment] = React.useState("");
  const [usersPage, setUsersPage] = React.useState(1);
  const [appointmentsPage, setAppointmentsPage] = React.useState(1);
  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const searchTerm = searchUser.toLowerCase();
    return (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  });

  // Filter consultations
  const filteredAppointments = consultations.filter((consultation) => {
    const searchTerm = searchAppointment.toLowerCase();
    return (
      `${consultation.firstName} ${consultation.lastName}`
        .toLowerCase()
        .includes(searchTerm) ||
      consultation.serviceType.toLowerCase().includes(searchTerm) ||
      consultation.businessType?.toLowerCase().includes(searchTerm) ||
      consultation.status.toString().toLowerCase().includes(searchTerm)
    );
  });

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (usersPage - 1) * itemsPerPage,
    usersPage * itemsPerPage
  );

  // Paginate Consultations
  const paginatedAppointments = filteredAppointments.slice(
    (appointmentsPage - 1) * itemsPerPage,
    appointmentsPage * itemsPerPage
  );

  // Statistics
  const stats = {
    totalUsers: users.length,
    totalConsultations: consultations.length,
    upcomingConsultations: consultations.filter(
      (a) =>
        new Date(a.preferredDate) > new Date() &&
        a.status === ConsultationStatus.Confirmed
    ).length,
    newUsersThisMonth: users.filter(
      (user) =>
        new Date(user.dateOfBirth).getMonth() === new Date().getMonth() &&
        new Date(user.dateOfBirth).getFullYear() === new Date().getFullYear()
    ).length,
  };

  if (loading) {
    return (
      <Stack>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} width="70%" radius="xl" />
      </Stack>
    );
  }

  return (
    <Stack p="md" mt={"50"}>
      {/* Statistics Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card withBorder>
          <Group>
            <IconUser size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.totalUsers")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.totalUsers}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconCalendarEvent size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.totalAppointments")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.totalConsultations}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconCalendarEvent size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.upcomingAppointments")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.upcomingConsultations}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconUser size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.newUsersThisMonth")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.newUsersThisMonth}
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Users Table */}
      <Paper p="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>{t("users.title")}</Title>
          <TextInput
            placeholder={t("users.searchPlaceholder")}
            leftSection={<IconSearch size={16} />}
            value={searchUser}
            onChange={(e) => setSearchUser(e.currentTarget.value)}
            w={300}
          />
        </Group>

        <TableScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("users.fields.name")}</Table.Th>
                <Table.Th>{t("users.fields.email")}</Table.Th>
                <Table.Th>{t("users.fields.phone")}</Table.Th>
                <Table.Th>{t("users.fields.createdAt")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{`${user.firstName} ${user.lastName}`}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.phoneNumber || "-"}</Table.Td>
                    <Table.Td>
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ textAlign: "center" }}>
                    <Text c="dimmed">{t("users.noUsers")}</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>

        <Space h="md" />
        <Pagination
          total={Math.ceil(filteredUsers.length / itemsPerPage)}
          value={usersPage}
          onChange={setUsersPage}
          siblings={1}
          boundaries={1}
        />
      </Paper>

      {/* consultations Table */}
      <Paper p="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>{t("consultations.title")}</Title>
          <TextInput
            placeholder={t("consultations.searchPlaceholder")}
            leftSection={<IconSearch size={16} />}
            value={searchAppointment}
            onChange={(e) => setSearchAppointment(e.currentTarget.value)}
            w={300}
          />
        </Group>

        <TableScrollContainer minWidth={1200}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("consultations.fields.client")}</Table.Th>
                <Table.Th>{t("consultations.fields.email")}</Table.Th>
                <Table.Th>{t("consultations.fields.phone")}</Table.Th>
                <Table.Th>{t("consultations.fields.service")}</Table.Th>
                <Table.Th>{t("consultations.fields.propertyType")}</Table.Th>
                <Table.Th>{t("consultations.fields.date")}</Table.Th>
                <Table.Th>{t("consultations.fields.time")}</Table.Th>
                <Table.Th>{t("consultations.fields.status")}</Table.Th>
                <Table.Th>{t("consultations.fields.projectDetails")}</Table.Th>
                <Table.Th>{t("consultations.fields.createdAt")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <Table.Tr key={appointment.id}>
                    <Table.Td>{`${appointment.firstName} ${appointment.lastName}`}</Table.Td>
                    <Table.Td>{appointment.email}</Table.Td>
                    <Table.Td>{appointment.phone}</Table.Td>
                    <Table.Td>
                      {t(`services.${appointment.serviceType}`)}
                    </Table.Td>
                    <Table.Td>{appointment.businessType || "-"}</Table.Td>
                    <Table.Td>
                      {new Date(appointment.preferredDate).toLocaleDateString()}
                    </Table.Td>
                    <Table.Td>{appointment.preferredTime}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          appointment.status === ConsultationStatus.Confirmed
                            ? "green"
                            : appointment.status === ConsultationStatus.Pending
                            ? "yellow"
                            : "red"
                        }
                      >
                        {t(`status.${appointment.status}`)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{appointment.businessNeeds}</Table.Td>
                    <Table.Td>
                      {new Date(appointment.createdAt).toLocaleString()}
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={10} style={{ textAlign: "center" }}>
                    <Text c="dimmed">{t("consultations.noAppointments")}</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>

        <Space h="md" />
        <Pagination
          total={Math.ceil(filteredAppointments.length / itemsPerPage)}
          value={appointmentsPage}
          onChange={setAppointmentsPage}
          siblings={1}
          boundaries={1}
        />
      </Paper>
    </Stack>
  );
}

export default AdminDashboard;
