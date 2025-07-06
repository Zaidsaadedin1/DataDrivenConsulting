import { ConsultationStatus } from "../../enums/ConsultationStatus";

export interface CreateConsultationDto {
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  businessType: string;
  preferredDate: string;
  preferredTime: string;
  businessNeeds: string;
  termsAccepted: boolean;
  status?: ConsultationStatus;
}

export interface GetConsultationDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  businessType: string;
  preferredDate: string;
  preferredTime: string;
  businessNeeds: string;
  termsAccepted: boolean;
  userId?: string;
  status: ConsultationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetConsultationForAdminDto {
  id: number;

  // Consultation Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  businessType: string;
  preferredDate: string;
  preferredTime: string;
  businessNeeds: string;
  termsAccepted: boolean;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt?: string;

  // Related User Info
  userId?: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userPhone?: string;
}
