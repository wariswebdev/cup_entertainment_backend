import { PrismaService } from '../prisma/prisma.service';
import { OTPService } from '../services/otp.service';

export class CleanupService {
  private prismaService: PrismaService;
  private otpService: OTPService;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.prismaService = new PrismaService();
    this.otpService = new OTPService(this.prismaService);
  }

  // Start the cleanup job (runs every 30 minutes)
  startCleanupJob() {
    if (this.intervalId) {
      console.log('Cleanup job is already running');
      return;
    }

    console.log('Starting cleanup job...');
    this.intervalId = setInterval(
      async () => {
        try {
          await this.otpService.cleanupExpiredOTPs();
          console.log('Expired OTPs cleaned up successfully');
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      },
      30 * 60 * 1000,
    ); // 30 minutes
  }

  // Stop the cleanup job
  stopCleanupJob() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Cleanup job stopped');
    }
  }

  // Manual cleanup
  async manualCleanup() {
    try {
      await this.otpService.cleanupExpiredOTPs();
      console.log('Manual cleanup completed');
    } catch (error) {
      console.error('Error during manual cleanup:', error);
    }
  }
}
