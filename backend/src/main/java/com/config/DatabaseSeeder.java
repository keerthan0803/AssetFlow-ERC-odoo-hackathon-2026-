package com.config;

import com.entity.*;
import com.enums.AssetStatus;
import com.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@Order(2)
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final AssetCategoryRepository categoryRepository;
    private final AssetRepository assetRepository;
    private final ResourceRepository resourceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            seedRoles();
        } catch (Exception e) {
            System.err.println("Skipping roles seeding: " + e.getMessage());
        }

        try {
            seedDepartments();
        } catch (Exception e) {
            System.err.println("Skipping departments seeding: " + e.getMessage());
        }

        try {
            seedEmployeesAndUsers();
        } catch (Exception e) {
            System.err.println("Skipping employees seeding: " + e.getMessage());
        }

        try {
            seedCategories();
        } catch (Exception e) {
            System.err.println("Skipping categories seeding: " + e.getMessage());
        }

        try {
            seedAssets();
        } catch (Exception e) {
            System.err.println("Skipping assets seeding: " + e.getMessage());
        }

        try {
            seedResources();
        } catch (Exception e) {
            System.err.println("Skipping resources seeding: " + e.getMessage());
        }
    }

    private void seedRoles() {
        if (roleRepository.count() <= 1) { // 1 is ADMIN created by AuthBootstrapper
            getOrCreateRole("ASSET_MANAGER", "Asset management and lifecycles coordinator");
            getOrCreateRole("DEPARTMENT_HEAD", "Department head with request approval authority");
            getOrCreateRole("EMPLOYEE", "Regular employee with allocation holdings");
        }
    }

    private void seedDepartments() {
        if (departmentRepository.count() <= 1) { // 1 is Administration
            getOrCreateDepartment("Engineering");
            getOrCreateDepartment("IT Operations");
            getOrCreateDepartment("Human Resources");
            getOrCreateDepartment("Finance");
            getOrCreateDepartment("Global Operations");
        }
    }

    private void seedEmployeesAndUsers() {
        if (employeeRepository.count() <= 1) { // 1 is Admin
            Role managerRole = roleRepository.findByRoleNameIgnoreCase("ASSET_MANAGER").orElse(null);
            Role headRole = roleRepository.findByRoleNameIgnoreCase("DEPARTMENT_HEAD").orElse(null);
            Role empRole = roleRepository.findByRoleNameIgnoreCase("EMPLOYEE").orElse(null);

            Department engDept = departmentRepository.findByDepartmentNameIgnoreCase("Engineering").orElse(null);
            Department itDept = departmentRepository.findByDepartmentNameIgnoreCase("IT Operations").orElse(null);
            Department opsDept = departmentRepository.findByDepartmentNameIgnoreCase("Global Operations").orElse(null);

            // Priya Shah - Department Head
            Employee priya = employeeRepository.save(Employee.builder()
                    .employeeCode("EMP-002")
                    .firstName("Priya")
                    .lastName("Shah")
                    .email("priya@gmail.com")
                    .phone("+91 9876543210")
                    .department(engDept)
                    .role(headRole)
                    .designation("Engineering Director")
                    .status(true)
                    .build());
            createLoginUser("priya@gmail.com", priya);

            // Ramesh Varma - Asset Manager
            Employee ramesh = employeeRepository.save(Employee.builder()
                    .employeeCode("EMP-003")
                    .firstName("Ramesh")
                    .lastName("Varma")
                    .email("ramesh@gmail.com")
                    .phone("+91 9876543211")
                    .department(itDept)
                    .role(managerRole)
                    .designation("IT Operations Lead")
                    .status(true)
                    .build());
            createLoginUser("ramesh@gmail.com", ramesh);

            // Sarah Chen - Regular Employee
            Employee sarah = employeeRepository.save(Employee.builder()
                    .employeeCode("EMP-004")
                    .firstName("Sarah")
                    .lastName("Chen")
                    .email("sarah@gmail.com")
                    .phone("+1 555-019-2834")
                    .department(opsDept)
                    .role(empRole)
                    .designation("Operations Associate")
                    .status(true)
                    .profileImage("https://lh3.googleusercontent.com/aida-public/AB6AXuAEhGD05nqOBGuK2c6w1SDZbJ4RD_jzNxhEsYTbQ5STMlULEhjT2zOyRGSBRyFzXAnT3Pm3GrTL-Vn_r0WJTO7kuUxgHsIP0SN5rIcAonNVxLuFiJOgjMQu8NsOufVBUd0SR7A2YgOD71m2z4Y_PScCSXcfmDIgcV6_jAWnWHsHFpA2hAvb1E-PmA0qTwV6K5zF_olakMQFEw6k2dnnK0IDDUbNyeujJSwrLIR0--lRpUyLoD2r")
                    .build());
            createLoginUser("sarah@gmail.com", sarah);
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            getOrCreateCategory("Electronics", "Hardware, workstations, and consumer electronics");
            getOrCreateCategory("Furniture", "Desks, task chairs, and office layouts");
            getOrCreateCategory("Hardware", "Networking cables, tooling, and accessories");
            getOrCreateCategory("Vehicles", "Company cars and logistics fleet");
        }
    }

    private void seedAssets() {
        if (assetRepository.count() == 0) {
            AssetCategory electronics = categoryRepository.findByCategoryNameIgnoreCase("Electronics").orElse(null);
            AssetCategory furniture = categoryRepository.findByCategoryNameIgnoreCase("Furniture").orElse(null);

            Department engDept = departmentRepository.findByDepartmentNameIgnoreCase("Engineering").orElse(null);
            Department itDept = departmentRepository.findByDepartmentNameIgnoreCase("IT Operations").orElse(null);

            assetRepository.save(Asset.builder()
                    .assetTag("AF-001")
                    .assetName("MacBook Pro 16\"")
                    .category(electronics)
                    .serialNumber("MBP16-928374-E")
                    .purchaseDate(LocalDate.now().minusDays(90))
                    .purchaseCost(new BigDecimal("2499.00"))
                    .condition("9/10")
                    .status(AssetStatus.AVAILABLE)
                    .location("Desk E12")
                    .department(engDept)
                    .vendor("Apple Store Bangalore")
                    .warrantyExpiry(LocalDate.now().plusYears(1))
                    .isBookable(false)
                    .build());

            assetRepository.save(Asset.builder()
                    .assetTag("AF-002")
                    .assetName("Ergonomic Task Chair")
                    .category(furniture)
                    .serialNumber("CHAIR-110293-C")
                    .purchaseDate(LocalDate.now().minusDays(180))
                    .purchaseCost(new BigDecimal("499.00"))
                    .condition("8/10")
                    .status(AssetStatus.AVAILABLE)
                    .location("Desk E14")
                    .department(engDept)
                    .vendor("Featherlite Systems")
                    .warrantyExpiry(LocalDate.now().plusYears(2))
                    .isBookable(false)
                    .build());

            assetRepository.save(Asset.builder()
                    .assetTag("AF-003")
                    .assetName("Conference B2 Projector")
                    .category(electronics)
                    .serialNumber("PROJ-883721-M")
                    .purchaseDate(LocalDate.now().minusDays(365))
                    .purchaseCost(new BigDecimal("1200.00"))
                    .condition("7/10")
                    .status(AssetStatus.AVAILABLE)
                    .location("Conference Room B2")
                    .department(itDept)
                    .vendor("Epson Distribution")
                    .warrantyExpiry(LocalDate.now().plusYears(1))
                    .isBookable(true)
                    .build());
        }
    }

    private void seedResources() {
        if (resourceRepository.count() == 0) {
            resourceRepository.save(Resource.builder()
                    .resourceName("Conference Room B2")
                    .resourceType("ROOM")
                    .capacity(12)
                    .location("B-Wing, Floor 2")
                    .status("Available")
                    .build());

            resourceRepository.save(Resource.builder()
                    .resourceName("Conference Room A1")
                    .resourceType("ROOM")
                    .capacity(8)
                    .location("A-Wing, Floor 1")
                    .status("Available")
                    .build());

            resourceRepository.save(Resource.builder()
                    .resourceName("Lab 3 — Electronics")
                    .resourceType("LAB")
                    .capacity(20)
                    .location("Main Wing, Floor 3")
                    .status("Available")
                    .build());

            resourceRepository.save(Resource.builder()
                    .resourceName("Delivery Van AF-343")
                    .resourceType("VEHICLE")
                    .capacity(5)
                    .location("Basement Garage")
                    .status("Available")
                    .build());
        }
    }

    private Role getOrCreateRole(String name, String desc) {
        return roleRepository.findByRoleNameIgnoreCase(name)
                .orElseGet(() -> roleRepository.save(Role.builder()
                        .roleName(name)
                        .description(desc)
                        .build()));
    }

    private Department getOrCreateDepartment(String name) {
        return departmentRepository.findByDepartmentNameIgnoreCase(name)
                .orElseGet(() -> departmentRepository.save(Department.builder()
                        .departmentName(name)
                        .status(true)
                        .build()));
    }

    private void getOrCreateCategory(String name, String desc) {
        categoryRepository.findByCategoryNameIgnoreCase(name)
                .orElseGet(() -> categoryRepository.save(AssetCategory.builder()
                        .categoryName(name)
                        .description(desc)
                        .build()));
    }

    private void createLoginUser(String email, Employee employee) {
        if (!userRepository.existsByEmail(email)) {
            userRepository.save(User.builder()
                    .email(email)
                    .password(passwordEncoder.encode("kittu123"))
                    .employee(employee)
                    .isActive(true)
                    .build());
        }
    }
}
