export interface IMessage {
  id: number
  senderId: string
  senderUserName: string
  senderProfilePictureUrl: string
  recipientId: string
  recipientUserName: string
  recipientProfilePictureUrl: string
  content: string
  dateRead: string
  messageSend: string
}
