package org.jpg.passwordgeneratorapi.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoogleUser {
    @Id
    private String id;
    @NotNull
    @OneToOne(
            fetch = FetchType.EAGER,
            optional = false,
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    )
    private User userId;


}
