import itDatabaseCert from '../assets/certifications/it-specialist-databases-certificate.png'
import responsiveWebCert from '../assets/certifications/responsive-web-design-certificate-1200.avif'
import gitCert from '../assets/certifications/git-certification-1200.avif'
import cloudCert from '../assets/certifications/cloud-computing-certification-1200.avif'
import devOpsCert from '../assets/certifications/dev-ops-certification-1200.avif'

export const CERTIFICATES_DATA = {
  itDatabase: {
    title: 'ITS-Database Certification',
    issuer: 'Certiport',
    year: '2025',
    image: itDatabaseCert,
    verifyUrl: 'https://www.credly.com/badges/ec097417-e36a-4642-b03b-df96919ae380/public_url'
  },
  responsiveWeb: {
    title: 'Responsive Web-Design Certification',
    issuer: 'FreeCodeCamp',
    year: '2024',
    image: responsiveWebCert,
    verifyUrl: 'https://www.freecodecamp.org/certification/kidlat/responsive-web-design'
  },
  git: {
    title: 'Git Training Certification',
    issuer: 'SkillUp by Simplilearn',
    year: '2025',
    image: gitCert,
    verifyUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI3NTgiLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC84NTQxODQ4Xzg4OTUyODcxNzUxMjA2MjA0MjY0LnBuZyIsInVzZXJuYW1lIjoiWmV1cyBBbmdlbG8gQmF1dGlzdGEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2823%2FGIT%2Fcertificate%2Fdownload-skillup&%24web_only=true'
  },
  cloud: {
    title: 'Cloud Computing Certification',
    issuer: 'SkillUp by Simplilearn',
    year: '2025',
    image: cloudCert,
    verifyUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNTExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU0NjQ2MF84ODk1Mjg3MTc1MTI4NTA5MTE5Ny5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F3971%2FIntroduction-to-Cloud-Computing%2Fcertificate%2Fdownload-skillup&%24web_only=true'
  },
  devOps: {
    title: 'DevOps Certification',
    issuer: 'SkillUp by Simplilearn',
    year: '2025',
    image: devOpsCert,
    verifyUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjc1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU1MjgwMF84ODk1Mjg3MTc1MTM3MjkzMzM4Mi5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6073%2FDevOps%2520101%3A%2520What%2520is%2520DevOps%253F%2Fcertificate%2Fdownload-skillup&%24web_only=true'
  }
}
