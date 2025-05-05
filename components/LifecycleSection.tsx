import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaSearch, FaPen, FaCode, FaRocket, FaTools } from "react-icons/fa";

// Type for lifecycle stage data
interface LifecycleStage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Lifecycle stages data
const lifecycleStages: LifecycleStage[] = [
  {
    title: "Discovery",
    description:
      "We explore your vision, uncovering goals and challenges to shape a strategic roadmap.",
    icon: <FaSearch className="text-4xl text-blue-500" />,
  },
  {
    title: "Design",
    description:
      "Crafting intuitive, user-focused designs with prototypes that breathe life into your ideas.",
    icon: <FaPen className="text-4xl text-blue-500" />,
  },
  {
    title: "Development",
    description:
      "Building scalable, high-performance software with cutting-edge technologies.",
    icon: <FaCode className="text-4xl text-blue-500" />,
  },
  {
    title: "Delivery",
    description:
      "Seamlessly launching your solution with rigorous testing for a flawless rollout.",
    icon: <FaRocket className="text-4xl text-blue-500" />,
  },
  {
    title: "Maintenance",
    description:
      "Ensuring long-term success with ongoing support, updates, and optimization.",
    icon: <FaTools className="text-4xl text-blue-500" />,
  },
];

// Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: LifecycleStage | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, stage }) => (
  <AnimatePresence>
    {isOpen && stage && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white p-8 rounded-lg max-w-md w-full mx-4 border border-blue-100"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {stage.icon}
          </motion.div>
          <motion.h3
            className="text-2xl font-bold text-blue-900 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {stage.title}
          </motion.h3>
          <motion.p
            className="text-gray-600 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {stage.description}
          </motion.p>
          <motion.button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
            onClick={onClose}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const LifecycleSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<LifecycleStage | null>(
    null
  );

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Animation for connecting line
  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  // Animation for progress dots
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2 + 0.5, duration: 0.4 },
    }),
  };

  // Animation for icon pulse
  const iconVariants = {
    hover: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.4, repeat: 1 },
    },
  };

  const openModal = (stage: LifecycleStage) => {
    setSelectedStage(stage);
    setModalOpen(true);
  };

  return (
    <section className="py-16 bg-transparent">
      {/* Scoped CSS */}
      <style jsx>{`
        .connecting-line {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 4px;
          transform: translateY(-50%);
        }
        .progress-dots {
          display: flex;
          justify-content: space-between;
          position: absolute;
          top: -20px;
          left: 0;
          width: 100%;
          padding: 0 16px;
        }
        .progress-dot {
          width: 12px;
          height: 12px;
          background-color: #3b82f6;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-blue-600 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Software Lifecycle Journey
        </motion.h2>
        <p className="text-gray-600 dark:text-white text-center mb-12 text-xl  max-w- px-auto">
          Software lifecycle refers to the entire process of creating, testing,
          and deploying software over its entire life cycle.
        </p>

        {/* Connecting Line (SVG) */}
        <div className="relative hidden md:block">
          <svg className="connecting-line" preserveAspectRatio="none">
            <motion.path
              d="M0,50 H1000"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </svg>
        </div>

        {/* Progress Dots */}
        <div className="relative hidden md:block">
          <div className="progress-dots">
            {lifecycleStages.map((_, index) => (
              <motion.div
                key={index}
                className="progress-dot"
                variants={dotVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
              />
            ))}
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 relative"
        >
          {lifecycleStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              className="bg-transparent  p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100 relative z-10 will-change-transform"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                borderColor: "#3B82F6",
                boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)",
              }}
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover="hover"
                variants={iconVariants}
              >
                {stage.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2 text-center">
                {stage.title}
              </h3>
              <p className="text-gray-600 dark:text-white text-center">{stage.description}</p>
              <motion.button
                className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
                whileHover={{
                  x: 5,
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(stage)}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stage={selectedStage}
      />
    </section>
  );
};

export default LifecycleSection;
